const VERSION = process.env.npm_package_version;

export const config = {
  name: 'guarantee-env',
  argument: '<guarantee-env>',
  description: 'guarantee-env ensures the environment variables are set before running your app',
  version: VERSION,
  configFile: 'guarantee-env.json',
  packageProp: 'guarantee-env'
}