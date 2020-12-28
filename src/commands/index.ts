import { Flags } from '../index';

import sort from './sort';
import check from './check';
import help from './help';
import log from '../helpers/log';

export class Result {
  passed: boolean;
  message?: string;
  data?: any;

  static data(data: any): Result {
    return {
      passed: true,
      data,
    };
  } 

  static passed(): Result {
    return {
      passed: true,
    };
  }

  static error(message?: string): Result {
    return {
      passed: false,
      message,
    }
  }
}

export type CommandHandler = (args: string[], flags: Flags) => Promise<Result>;
export type CommandCondition = (args: string[], flags: Flags) => Result;
export type CommandRunner = (args: string[], flags: Flags) => void | never;

interface ICommandExecutor {
  run: CommandRunner;
}

interface CommandExecutorConfig {
  handler: CommandHandler;
  condition?: CommandCondition;
  name: string
}

export class CommandExecutor implements ICommandExecutor {
  private readonly handler: CommandHandler;
  private readonly condition?: CommandCondition;
  private readonly name: string;

  constructor(config: CommandExecutorConfig) {
    this.handler = config.handler;
    this.condition = config.condition;
    this.name = config.name;
  }

  async run(args: string[], flags: Flags) {
    const { passed, message = '' } = this.condition ? this.condition(args, flags) : { passed: true };
    if (passed) {
      return await this.handler(args, flags);
    } else {
      log.error(message || `Command '${this.name}' - failed`);
      return Result.error(message);
    }
  }
}

export {
  sort,
  check,
  help
};
