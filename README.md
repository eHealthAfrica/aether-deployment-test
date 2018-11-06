# Aether Deployment Test

Tests an Aether deployment by performing the following tasks:

1. Creating a surveyor on ODK
2. Creating a project on ODK
3. Creating an XForm on ODK and associating it with the project
4. Propagating the project and XForm to Kernel
5. Submitting an XForm to ODK
6. Checking that the submission is present on Kernel
7. Checking that an attachment is present on Kernel and can be accessed

The script requires a few environment variables:

- `ODK_ADMIN_TOKEN`
- `ODK_URL`
- `KERNEL_ADMIN_TOKEN`
- `KERNEL_URL`
- `KERNEL_ADMIN_PASSWORD`

The easiest way to get these is to just add (or link) a .env file to this directory - although you will still need to set the URLs, since they're not currently included in the standard Aether `.env` file.
