export type LoadResult<TConfig extends any = unknown> = {
  config: TConfig;
  filepath: string;
};