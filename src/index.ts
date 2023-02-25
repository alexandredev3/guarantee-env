import { program } from 'commander';

import type { OptionValues } from 'typings';

import { action } from './action';
import { config, flags } from './constants';

const { input, output, configPath } = flags;

program
  .argument(config.argument)
  .name(config.name)
  .description(config.description)
  .version(config.version!);

program
  .option(input.flag, input.description, input.defaultValue)
  .option(output.flag, output.description, output.defaultValue)
  .option(configPath.flag, configPath.description, configPath.defaultValue);

program.action(async (_, options: OptionValues) => action(options));

program.parse();
