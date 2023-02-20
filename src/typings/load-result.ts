import type { LoadResult, EnvFile, Config } from '.';

export type LoadEnvResult = LoadResult<EnvFile | null>;

export type LoadAutoEnvConfigResult = LoadResult<Config | null>;