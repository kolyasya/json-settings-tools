import _ from 'lodash';

import { CommandHandler, Result } from '../index';
import { Flags } from '../../index';
import { readFile } from '../methods';
import log from '../../helpers/log';
import checkMethod from './method';

const check: CommandHandler = async (args: string[], flags: Flags): Promise<Result> => {
  log.success(`Checking settings file - ${flags['--target']} by main file - ${flags['--main']}`);
  
  const readmainResult = await readFile(flags['--main']!);
  if (readmainResult.message) {
    log.error('Failed to read file');
    log.error(`Error: ${readmainResult.message}`);
    return Result.error()
  }
  
  const readTargetResult = await readFile(flags['--target']!);
  if (readTargetResult.message) {
    log.error('Failed to read file');
    log.error(`Error: ${readTargetResult.message}`);
    return Result.error()
  }

  const main = readmainResult.data;
  const target = readTargetResult.data;

  return checkMethod({ target, main }, flags);
}

export default check;