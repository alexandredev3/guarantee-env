import type { OptionValues, ConfigVariable } from 'typings';

import { LogBeautify } from './utils/log-beautify';

import { loadEnv, loadConfig, loadEnvExample } from './load';
import { findMissingEnvironmentVariables } from './find-missing-env-variables';
import { createEnvFile } from './create-env-file';

export async function action(options: OptionValues) {
  const { input, output, config: configPath } = options;

  try {
    const configFile = await loadConfig(configPath);
    const envExampleFile = await loadEnvExample(input);

    let envFile = await loadEnv(output);

    if (!envFile && !envExampleFile) {
      console.warn(
        LogBeautify.warning(
          `Could not find .env or .env.example files in ${output} and ${input}`
        )
      );
      process.exit(0);
    }

    if (!envFile) {
      await createEnvFile(output, input);

      const createdEnvFile = await loadEnv(output);

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
}
