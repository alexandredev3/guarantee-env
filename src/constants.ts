import { join } from 'node:path';

import { version } from '../package.json';

const cwd = process.cwd();

export const constants = {
  name: 'auto-env',
  description: 'auto-env creates your .env project file automatically',
  flags: {
    input: {
      flag: '--input <string>',
      description: '.env file input path',
      defaultValue: join(cwd, '.env.example')
    },
    output: {
      flag: '--output <string>',
      description: '.env file output path',
      defaultValue: join(cwd, '.env')
    },
    ignoreEmptyVars: {
      flag: '--ignore-empty-vars <boolean>',
      description: 'ignores empty variable values',
      defaultValue: false
    }
  },
  version: process.env.npm_package_version ?? version
};