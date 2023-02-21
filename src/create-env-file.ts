import fs from 'fs-extra';

export const createEnvFile = (envPath: string, envExamplePath: string) => {
  try {
    return fs.copy(envExamplePath, envPath);
  } catch(error) {
    throw error;
  }
}