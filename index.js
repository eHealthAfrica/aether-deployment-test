require('dotenv').config()
const util = require('util')
const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')
const program = require('commander')

const xform = require('./artefacts/xform.js')
const rawSubmission = require('./artefacts/submission.js')

// program
//   .option('-c, --submission-count', 'Number of submissions to make', parseInt, 5)
//   .option('-i, --submission-interval', 'Interval between submissions (in ms)', parseInt, 500)
//   .parse(process.argv)

// console.log(`Count: ${program.submissionCount}`)
// console.log(`Interval: ${program.submissionInterval}`)
// console.log(program.args)

program
  .option('-c, --submission-count [number]', 'Number of submissions to make', 1)
  .option('-i, --submission-interval [number]', 'Interval between submissions in ms', 500)
  .parse(process.argv);

const urls = {
  odk: process.env.ODK_URL,
  kernel: process.env.KERNEL_URL
}

const tokens = {
  odk: process.env.ODK_ADMIN_TOKEN,
  kernel: process.env.KERNEL_ADMIN_TOKEN
}

let surveyorId, projectId, xFormId

const setTimeoutPromise = util.promisify(setTimeout)

const log = (logText, logLevel = 0) => {
  if (logLevel > 0) {
    const d = new Date()
    console.log(d.getHours().toString().padStart(2, '0') +
      ':' + d.getMinutes().toString().padStart(2, '0') +
      ':' + d.getSeconds().toString().padStart(2, '0') + ' ' + logText)
  }
}

const generateOptions = (module, entity, payload, method, id, pathExtension) => {
  const plural = entity == 'entity' ? 'entities' : `${entity}s`
  let options = {
    uri: `${urls[module]}/${plural}/${id ? id + '/' : ''}${pathExtension ? pathExtension + '/' : ''}`,
    method: method || 'POST',
    headers: {
      'Authorization': 'Token ' + tokens[module]
    },
    json: true
  }
  if (payload) {
    options.body = payload
  }
  return options
}

const createSurveyor = () => {
  const options = generateOptions('odk', 'surveyor', {
    'username': 'deployment-test',
    'password': 'deployment-test'
  })
  return rp(options)
    .then(response => {
      surveyorId = response.id
    })
}

const deleteSurveyor = () => {
  const options = generateOptions('odk', 'surveyor', {}, 'DELETE', surveyorId)
  return rp(options)
}

const createProject = () => {
  log('Creating project')
  const options = generateOptions('odk', 'project', {
    'name': 'deployment-test',
    'surveyors': [ surveyorId ]
  })
  return rp(options)
    .then(response => {
      projectId = response.project_id
      return projectId
    })
}

const deleteProject = () => {
  const options = generateOptions('odk', 'project', {}, 'DELETE', projectId)
  return rp(options)
}

const deleteKernelProject = () => {
  const options = generateOptions('kernel', 'project', {}, 'DELETE', projectId)
  return rp(options)
}

const createXForm = (projectId) => {
  log(`Creating XForm (project: ${projectId})`)
  const options = generateOptions('odk', 'xform', {
    'title': 'deployment-test',
    'xml_data': xform,
    'project': projectId
  })
  return rp(options)
    .then(response => {
      xFormId = response.id
    })
}

const propagate = () => {
  log(`Propagating (project: ${projectId})`)
  const options = generateOptions('odk', 'project', {}, 'PATCH', projectId, 'propagate')
  return rp(options)
}

const submitData = () => {
  log('Submitting data')
  const uuid = uuidv1()
  const base64EncodedData = new Buffer('deployment-test:deployment-test').toString('base64')
  const options = {
    uri: urls.odk + '/submission',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64EncodedData
    },
    formData: {
      'xml_submission_file': {
        value: rawSubmission.replace('#!uuid', uuid),
        options: {
          filename: 'xml_submission_file'
        }
      },
      'attachment_test':  {
        value: rawSubmission,
        options: {
          filename: 'attachment_test'
        }
      }
    }
  }
  return rp(options)
    .then(() => uuid)
}

const checkSubmission = (uuid) => {
  log(`Checking submission ${uuid}`)
  const options = generateOptions('kernel', 'submission', false, 'GET')
  options.uri += '?payload__meta__instanceID=uuid:' + uuid
    + '&project=' + projectId
  return rp(options)
    .then(response => {
      if (response.count !== 1) {
        console.error('Submission not found (Project: ' + projectId + ')')
        throw new Error()
      }
      return response.results[0]
    })
}

const checkAttachment = (submission) => {
  log(`Checking attachment ${submission.id}`)
  let attachmentUrl = submission.attachments
    .find(a => a.name === 'attachment_test')
    .url
  const isBucket = attachmentUrl.indexOf('/media/') === -1
  if (!isBucket) {
    attachmentUrl = attachmentUrl.replace('/media/', '/media-basic/')
  }
  const options = {
    uri: attachmentUrl
  }
  if (!isBucket) {
    const base64EncodedData = new Buffer('admin:' + process.env.KERNEL_ADMIN_PASSWORD).toString('base64')
    options.headers = {
      'Authorization': 'Basic ' + base64EncodedData
    }
  }
  return rp(options)
    .then(attachment => {
      if (attachment === rawSubmission) {
        return submission
      } else {
        throw new Error(attachment)
      }
    })
}

const checkEntity = (submission) => {
  log(`Checking entity ${submission.id}`)
  let options = generateOptions('kernel', 'entity', false, 'GET')
  options.uri +=  '?submission=' + submission.id
  return rp(options)
    .then(response => {
      if (response.count !== 1) {
        throw new Error('Entity not found (Submission: ' + submission.id + ')')
      }
      return true
    })
}

const submitAndCheck = () => {
  return submitData()
    .then(checkSubmission)
    .then(checkAttachment)
    .then(checkEntity)
    .then(() => {
      log('Round trip completed 🚀', 1)
      return true
    })
}

const submissions = () => {
  log('program.submissionCount: ' + program.submissionCount)
  const totalSubmissions = [...Array(Number(program.submissionCount)).keys()].map(key => {
    return setTimeoutPromise(key * Number(program.submissionInterval))
      .then(submitAndCheck)
  })
  log(totalSubmissions.length + ' submissions')
  return Promise.all(totalSubmissions)
}

const tearDown = () => {
  log('Tear down')
  return deleteSurveyor()
    .then(deleteProject)
    .then(deleteKernelProject)
}

createSurveyor()
  .then(createProject)
  .then(createXForm)
  .then(propagate)
  .then(submissions)
  .then(tearDown)
  .catch(err => {
    console.error(err)
    tearDown()
  })