require('dotenv').config()
const rp = require('request-promise-native')
const uuidv1 = require('uuid/v1')

const xform = require('./artefacts/xform.js')
const submission = require('./artefacts/submission.js')

const urls = {
  odk: process.env.ODK_URL,
  kernel: process.env.KERNEL_URL
}

const tokens = {
  odk: process.env.ODK_ADMIN_TOKEN,
  kernel: process.env.KERNEL_ADMIN_TOKEN
}

let surveyorId, projectId, xFormId

const generateOptions = (module, entity, payload, method, id, pathExtension) => {
  let options = {
    uri: `${urls[module]}/${entity}s/${id ? id + '/' : ''}${pathExtension ? pathExtension + '/' : ''}`,
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
  const options = generateOptions('odk', 'project', {}, 'PATCH', projectId, 'propagate')
  return rp(options)
}

const submitData = () => {
  const base64EncodedData = new Buffer('deployment-test:deployment-test').toString('base64')
  const options = {
    uri: urls.odk + '/submission',
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + base64EncodedData
    },
    formData: {
      'xml_submission_file': {
        value: submission.replace('#!uuid', uuidv1()),
        options: {
          filename: 'xml_submission_file'
        }
      },
      'attachment_test':  {
        value: submission,
        options: {
          filename: 'attachment_test'
        }
      }
    }
  }
  return rp(options)
}

const checkSubmission = () => {
  const options = generateOptions('kernel', 'submission', false, 'GET')
  options.uri += '?project=' + projectId
  return rp(options)
    .then(response => {
      if (response.count !== 1) {
        console.error('Submission not found (Project: ' + projectId + ')')
        throw new Error()
      }
      return response.results[0].attachments
        .find(a => a.name === 'attachment_test')
        .url
    })
}

const checkAttachment = (url) => {
  const isBucket = url.indexOf('/media/') === -1
  if (!isBucket) {
    url = url.replace('/media/', '/media-basic/')
  }
  const options = {
    uri: url
  }
  if (!isBucket) {
    const base64EncodedData = new Buffer('admin:' + process.env.KERNEL_ADMIN_PASSWORD).toString('base64')
    options.headers = {
      'Authorization': 'Basic ' + base64EncodedData
    }
  }
  rp(options)
    .then(attachment => {
      if (attachment === submission) {
        console.log('Round trip completed 🚀')
      } else {
        throw new Error(attachment)
      }
    })
}

const tearDown = () => {
  return deleteSurveyor()
    .then(deleteProject)
    .then(deleteKernelProject)
}

createSurveyor()
  .then(createProject)
  .then(createXForm)
  .then(propagate)
  .then(submitData)
  .then(checkSubmission)
  .then(checkAttachment)
  .then(tearDown)
  .catch(err => {
    console.log(err)
    tearDown()
  })