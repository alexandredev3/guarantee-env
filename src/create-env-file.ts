import fs from 'fs-extra';

export const createEnvFile = (output: string, envExamplePath: string) => {
  try {
    return fs.copy(envExamplePath, output);
  } catch(error) {
    throw error;
  }
}