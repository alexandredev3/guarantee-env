import type { EnvFile, Config, ConfigVariable } from './typings';

export const findMissingEnvironmentVariables = (
  configFile: Config,
  envFile: EnvFile
): ConfigVariable[] => {
  const missingEnvironmentVariables = configFile.variables.filter(
    (environmentVariableFromConfig) => {
      const missingEnvironmentVariable = envFile.find(
        (environmentVariableFromEnvFile) =>
          environmentVariableFromEnvFile.variable ===
          environmentVariableFromConfig.variable
      );
      const isMissingVariableValue = !!!missingEnvironmentVariable?.value;
      const isVariableRequired = environmentVariableFromConfig.required;

      return isMissingVariableValue && isVariableRequired;
    }
  );

  return missingEnvironmentVariables;
};
