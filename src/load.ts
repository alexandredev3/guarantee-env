import { injectable, inject } from 'inversify';
import type { cosmiconfig } from 'cosmiconfig';

import { CONTAINER_TYPES } from './constants';
import { parseEnvironmentVariables } from './utils/parse-environment-variables';

import type { IFs } from './fs';
import type { IExplorer } from './explorer';

import { Config, EnvFile } from 'typings';

type LoadConfigResult = {
  config: Config;
  filepath: string;
};

export interface ILoad {
  loadEnv(envPath: string): Promise<EnvFile | null>;
  loadConfig(configPath?: string): Promise<LoadConfigResult>;
}

@injectable()
export class Load implements ILoad {
  constructor(
    @inject(CONTAINER_TYPES.EXPLORER)
    private _explorer: IExplorer,
    @inject(CONTAINER_TYPES.FS) private _fs: IFs
  ) {
    this._explorer = _explorer;
    this._fs = _fs;
  }

  public async loadConfig(configPath?: string): Promise<LoadConfigResult> {
    try {
      return this._explorer.search(configPath) as Promise<LoadConfigResult>;
    } catch (error) {
      throw error;
    }
  }

  public async loadEnv(envPath: string): Promise<EnvFile | null> {
    try {
      const file = await this._fs.readFile(envPath);

      if (!file) {
        return null;
      }
      
      return parseEnvironmentVariables(file);
    } catch (error: any) {
      throw error;
    }
  }
}
