export const getRequiredEnvVars = (environmentString: string) => {
  const environmentVariables = environmentString.split('\n');

  let emptyenvironmentVariableValues: string[] = [];

  environmentVariables.forEach((environmentVariable) => {
    const [name, value] = environmentVariable.split('=');

    if (!value) {
      emptyenvironmentVariableValues.push(name);
    }
  });

  return emptyenvironmentVariableValues;
}