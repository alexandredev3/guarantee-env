import { inputOptionFactory } from './input-option-factory';
import { outputOptionFactory } from './output-option-factory';
import { ignoreEmptyVarsOptionFactory } from './ignore-empty-vars-factory';

export enum Options {
  INPUT_OPTION = 'input-option',
  OUTPUT_OPTION = 'output-option',
  IGNORE_EMPTY_VARS_OPTION = 'ignore-empty-vars-option',
}

const FACTORIES = {
  [Options.INPUT_OPTION]: inputOptionFactory,
  [Options.OUTPUT_OPTION]: outputOptionFactory,
  [Options.IGNORE_EMPTY_VARS_OPTION]: ignoreEmptyVarsOptionFactory,
}

export class OptionFactory {
  public static add(option: Options) {
    const factoryInstance = FACTORIES[option];

    return factoryInstance;
  }
}