import fs from 'fs-extra';
import { cosmiconfig } from 'cosmiconfig';

import { config } from 'constants/config';
import { parseEnvironmentVariables } from 'utils/parse-environment-variables';

import { LoadAutoEnvConfigResult } from './typings';

const explorer = cosmiconfig(config.name, {
  searchPlaces: [config.configFile],
  packageProp: config.packageProp
});

export const loadConfig = (
  configPath?: string
): Promise<LoadAutoEnvConfigResult> => {
  try {
    return explorer.search(configPath) as Promise<LoadAutoEnvConfigResult>;
  } catch (error) {
    throw error;
  }
};

export const loadEnv = async (path: string) => {
  try {
    const file = await fs.readFile(path, {
      encoding: 'utf-8'
    });

    return parseEnvironmentVariables(file);
  } catch (error: any) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      return null;
    }

    throw error;
  }
};

export const loadEnvExample = async (path: string = '.env.example') => {
  try {
    const file = await fs.readFile(path, {
      encoding: 'utf-8'
    });

    return parseEnvironmentVariables(file);
  } catch (error: any) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      return null;
    }

    throw error;
  }
};
