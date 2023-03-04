import { injectable } from 'inversify';
import fs from 'fs-extra';
import type { PathOrFileDescriptor, CopyOptions } from 'fs-extra';

export interface IFs {
  readFile(path: PathOrFileDescriptor): Promise<string | null>;
  copyFile(src: string, dest: string, options?: CopyOptions): Promise<void>;
}

@injectable()
export class Fs implements IFs {
  public async readFile(path: PathOrFileDescriptor): Promise<string | null> {
    try {
      const file = await fs.readFile(path, {
        encoding: 'utf-8',
      });
  
      return file;
    } catch(error: any) {
      if (error.code === 'ENOENT' || error.code === 'EISDIR') {
        return null;
      }

      throw error;
    }
  }

  public async copyFile(
    src: string,
    dest: string,
    options?: fs.CopyOptions
  ): Promise<void> {
    return fs.copy(src, dest, options);
  }
}
