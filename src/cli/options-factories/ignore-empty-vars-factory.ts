import { Option } from "commander";

import { constants } from '../../constants';

const { flag, description, defaultValue } = constants.flags.ignoreEmptyVars;

export const ignoreEmptyVarsOptionFactory = new Option(flag, description)
  .default(defaultValue);