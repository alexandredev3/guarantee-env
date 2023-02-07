import { Option } from "commander";

import { constants } from '../../constants';

const { flag, description, defaultValue } = constants.flags.output;

export const outputOptionFactory = new Option(flag, description)
  .default(defaultValue);