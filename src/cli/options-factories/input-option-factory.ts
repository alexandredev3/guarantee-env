import { Option } from 'commander';

import { constants } from '../../constants';

const { flag, description, defaultValue } = constants.flags.input;

export const inputOptionFactory = new Option(flag, description)
  .default(defaultValue);