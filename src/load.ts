import { cosmiconfig, defaultLoaders } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { config } from 'constants/config';
import { parseEnvironmentVariables } from 'utils/parse-environment-variables';

import { LoadAutoEnvConfigResult, LoadEnvResult } from './typings';

const transformer = (cosmiconfigResult: CosmiconfigResult) => {
  const isEnvFile = cosmiconfigResult?.filepath.includes('.env');

  let result = cosmiconfigResult;

  if (isEnvFile) {
    const environmentVariablesParsed = parseEnvironmentVariables(
      cosmiconfigResult?.config
    );

    if (result?.config) {
      result.config = environmentVariablesParsed;
    }
  }

  return result;
};

const explorer = cosmiconfig(config.name, {
  searchPlaces: [config.configFile],
  loaders: {
    '.example': defaultLoaders.noExt,
  },
  packageProp: config.packageProp,
  transform: transformer,
});

export const loadEnv = async (
  path: string
): Promise<LoadEnvResult> => {
  try {
    const file = await explorer.load(path);

    return file as LoadEnvResult;
  } catch (error: any) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      return {
        config: null,
        filepath: path
      };
    }
    
    throw error;
  }
};

export const loadEnvExample = async (
  path: string = '.env.example'
): Promise<LoadEnvResult> => {
  try {
    const file = await explorer.load(path);

    return file as LoadEnvResult;
  } catch (error: any) {
    if (error.code === 'ENOENT' || error.code === 'EISDIR') {
      return {
        config: null,
        filepath: path
      };
    }
    
    throw error;
  }
};

export const loadConfig = (configPath?: string): Promise<LoadAutoEnvConfigResult> => {
  try {
    return explorer.search(configPath) as Promise<LoadAutoEnvConfigResult>;
  } catch (error) {
    throw error;
  }
};
