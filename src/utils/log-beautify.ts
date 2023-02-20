import chalk from 'chalk';

export class LogBeautify {
  private static readonly code = {
    error: '[ERROR]',
    info: '[INFO]',
    warning: '[WARNING]'
  };

  private static format(code: string, message: string) {
    return code + ' ' + message;
  }

  public static error<T extends any = unknown>(message: T) {
    return LogBeautify.format(chalk.bold.bgRed(this.code.error), chalk.red(message));
  }

  public static info<T extends any = unknown>(message: T) {
    return LogBeautify.format(chalk.bold.bgCyan(this.code.info), chalk.cyan(message));
  }

  public static warning<T extends any = unknown>(message: T) {
    return LogBeautify.format(chalk.bold.bgYellow(this.code.warning), chalk.yellow(message));
  }
}