#!/usr/bin/env node
import Arg from 'arg';
import _ from 'lodash';

import { Result, CommandExecutor, sort, check } from './commands';
import log from './helpers/log';
import commandHandler from './handler';

export type Commands = 'check' | 'sort' | 'help';
export type FlagKeys = '--main' | '--target' | '--output' | '--except';

const rawArgs = Arg({
  '--main': String,
  '--target': String,
  '--help': Boolean,
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

const main = (async () => {
  const args = rawArgs;

  process.env.SILENT_MODE = args['--silent']! ? 'true' : 'false';

  const executionResult = await commandHandler(args);

  if (executionResult?.passed) {
    process.exit(0)
  } else {
    process.exit(1)
  }
})()
