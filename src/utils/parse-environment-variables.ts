import type { EnvFile } from 'typings';

const RESERVED_BREAKLINE_REGEX = /\r\n|\n/;

export const parseEnvironmentVariables = (
  environmentString: string
): EnvFile => {
  const environmentVariablesParsed = environmentString
    .split(RESERVED_BREAKLINE_REGEX)
    .filter(
      (environmentVariable) =>
        !environmentVariable.includes('#') && environmentVariable !== ''
    )
    .map((environmentVariable) => {
      const [name, value] = environmentVariable.split('=');

      return {
        variable: name.trim(),
        value: value.trim() || null,
      };
    });

  return environmentVariablesParsed;
};
