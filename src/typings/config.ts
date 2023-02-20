export type ConfigVariable = {
  variable: string;
  required?: boolean;
  description?: string;
}

export type Config = {
  variables: ConfigVariable[];
}