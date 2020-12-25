#!/usr/bin/env node
import Arg from 'arg';
import _ from 'lodash';

import { Result, CommandExecutor, sort, check } from './commands';
import log from './helpers/log';

type Commands = 'check' | 'sort';
export type FlagKeys = '--main' | '--target' | '--output' | '--except';

const rawArgs = Arg({
  '--main': String,
  '--target': String,
  '--output': String,
  '--except': String,
  '--silent': Boolean,
  '-e': '--except',
  '-o': '--output',
  '-m': '--main',
  '-t': '--target'
}, { argv: process.argv.slice(2) });

export type FlagsType = typeof rawArgs;

export type Flags = Pick<FlagsType, FlagKeys>;

const handlers: { [key in Commands]?: CommandExecutor } = {
  sort: new CommandExecutor({
    handler: sort,
    name: 'sort',
    condition: (args, flags) => {
      if (!flags['--target']) {
        return Result.error('Flag: --target is required for this command');
      }

      return Result.passed();
    }
  }),
  check: new CommandExecutor({
    handler: check,
    name: 'check',
    condition: (args, flags) => {
      if (!flags['--target'] || !flags['--main']) {
        return Result.error('Flags: --target and --main - are required for this command');
      }

      return Result.passed();
    }
  })
}

const main = async () => {
  const args = rawArgs;

  process.env.SILENT_MODE = args['--silent']! ? 'true' : 'false';

  const [command] = rawArgs._ as Array<Commands>;

  const currentHandler = handlers[command];

  if (!currentHandler) {
    log.error(`'${command}' is not a valid command. Check the README.MD`);
    return;
  }
  log.ln();
  log.info(_.capitalize(command));
  const executionResult = await currentHandler.run([command], args);

  if (executionResult?.passed) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}

main();