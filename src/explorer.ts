import { injectable } from 'inversify';
import { cosmiconfig } from 'cosmiconfig';

import type { Config } from './typings';

import { config } from './constants';

type LoadConfigResult = {
  config: Config;
  filepath: string;
};

export interface IExplorer {
  search(searchFrom?: string): Promise<LoadConfigResult>;
}

const _explorer = cosmiconfig(config.name, {
  searchPlaces: [config.configFile],
  packageProp: config.packageProp,
})

@injectable()
export class Explorer implements IExplorer {
  public search(searchFrom?: string | undefined): Promise<LoadConfigResult> {
    try {
      return _explorer.search(searchFrom) as Promise<LoadConfigResult>;
    } catch (error) {
      throw error;
    }
  }
}
