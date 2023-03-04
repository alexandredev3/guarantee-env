import { join } from 'node:path';

const cwd = process.cwd();

const createFlag = <TDefaultValue extends any = unknown>(flag: {
  name: string;
  type: string;
  description: string;
  defaultValue: TDefaultValue;
}) => {
  const { name, type, description, defaultValue } = flag;

  return {
    flag: '--' + name + ' ' + '<' + type + '>',
    description,
    defaultValue,
  };
};

export const flags = {
  input: createFlag({
    name: 'input',
    type: 'string',
    description: '.env.example file input path',
    defaultValue: join(cwd, '.env.example'),
  }),
  output: createFlag({
    name: 'output',
    type: 'string',
    description: '.env file output path',
    defaultValue: join(cwd, '.env'),
  }),
  configPath: createFlag({
    name: 'config',
    type: 'string',
    description: 'custom path for guarantee-env.json',
    defaultValue: join(cwd, 'guarantee-env.json'),
  }),
};