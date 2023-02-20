import type { EnvFile } from "typings";

export const parseEnvironmentVariables = (environmentString: string): EnvFile => {
  const environmentVariables = environmentString.split(" ");

  const environmentVariablesParsed = environmentVariables.map((environmentVariable) => {
    const [name, value] = environmentVariable.split('=');

    return {
      variable: name,
      value: value || null
    }
  });

  return environmentVariablesParsed;
}