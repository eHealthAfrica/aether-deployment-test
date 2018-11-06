# Aether Deployment Test

Tests an Aether deployment by performing the following tasks:

1. Creating a surveyor on ODK
2. Creating a project on ODK
3. Creating an XForm on ODK and associating it with the project
4. Propagating the project and XForm to Kernel
5. Submitting an XForm to ODK
6. Checking that the submission is present on Kernel
7. Checking that an attachment is present on Kernel and can be accessed

After completion the script does an almost-complete teardown - unfortunately I can't figure out a way to reliably delete media files, so they are left hanging around.

The script requires a few environment variables:

- `ODK_ADMIN_TOKEN`
- `ODK_URL`
- `KERNEL_ADMIN_TOKEN`
- `KERNEL_URL`
- `KERNEL_ADMIN_PASSWORD`

The easiest way to get these is to just add (or link) a `.env` file to this directory - although you will still need to set the URLs, since they're not currently included in the standard Aether `.env` file.

## Installation

```
git clone git@github.com:eHealthAfrica/aether-deployment-test.git
cd aether-deployment-test
npm install
ln -s ../gather-deploy/.env . # for example
ODK_URL=http://odk.aether.local KERNEL_URL=http://kernel.aether.local node index
```
