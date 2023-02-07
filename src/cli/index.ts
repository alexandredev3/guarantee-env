import { Command } from 'commander';

import { constants } from '../constants';

import { OptionFactory, Options } from './options-factories';

export const program = new Command();

program.name(constants.name);
program.description(constants.description);
program.version(constants.version);

program.addOption(OptionFactory.add(Options.INPUT_OPTION));
program.addOption(OptionFactory.add(Options.OUTPUT_OPTION));
program.addOption(OptionFactory.add(Options.IGNORE_EMPTY_VARS_OPTION));

program.action((name, options) => {
  console.log({
    name,
    options
  });
});