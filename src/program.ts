import { injectable, inject } from 'inversify';
import type { Command, ParseOptions } from 'commander';

import type { OptionValues, ConfigVariable } from './typings';
import type { ILoad } from './load';
import type { IFs } from './fs';

import { LogBeautify } from './utils/log-beautify';
import { findMissingEnvironmentVariables } from './utils/find-missing-env-variables';

import { CONTAINER_TYPES, config, flags } from './constants';

export interface IProgram {
  run(argv?: readonly string[], options?: ParseOptions): Promise<void>;
}

@injectable()
export class Program implements IProgram {
  constructor(
    @inject(CONTAINER_TYPES.LOAD) private _load: ILoad,
    @inject(CONTAINER_TYPES.FS) private _fs: IFs,
    @inject(CONTAINER_TYPES.COMMAND) private _command: Command
  ) {
    const { name, description, version } = config;
    const { input, output, configPath } = flags;

    this._command.name(name);

    this._command.description(description);
    this._command.version(version!);

    this._command.option(input.flag, input.description, input.defaultValue);
    this._command.option(output.flag, output.description, output.defaultValue);
    this._command.option(
      configPath.flag,
      configPath.description,
      configPath.defaultValue
    );

    this._load = _load;
  }

  public async run(argv?: string[], options?: ParseOptions): Promise<void> {
    const {
      input,
      output,
      config: configPath,
    } = this._command.opts<OptionValues>();

    this._command.action(async () => {
      try {
        const configFile = await this._load.loadConfig(configPath);
        const envExampleFile = await this._load.loadEnv(input);

        let envFile = await this._load.loadEnv(output);

        if (!envFile && !envExampleFile) {
          console.warn(
            LogBeautify.warning(
              `Could not find .env or .env.example files in ${output} and ${input}`
            )
          );
          process.exit(0);
        }

        if (!envFile) {
          await this._fs.copyFile(input, output);

          const createdEnvFile = await this._load.loadEnv(output);

          envFile = createdEnvFile;
        }

        let missingEnvironmentVariables: ConfigVariable[] = [];

        if (configFile?.config) {
          missingEnvironmentVariables = findMissingEnvironmentVariables(
            configFile.config,
            envFile!
          );
        } else {
          missingEnvironmentVariables = envFile!.filter(
            (environmentVariable) => !environmentVariable.value
          );
        }

        const hasMissingEnvironmentVariables =
          missingEnvironmentVariables.length > 0;

        if (hasMissingEnvironmentVariables) {
          console.error(
            LogBeautify.error('Required environment variables are missing')
          );
          console.table(missingEnvironmentVariables);

          process.exit(1);
        }

        console.log(
          LogBeautify.success('Required environment variables are set')
        );
        process.exit(0);
      } catch (error: any) {
        console.error(LogBeautify.error(error));

        process.exit(1);
      }
    });

    this._command.parse(argv, options);
  }
}
