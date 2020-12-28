import { CommandHandler, Result } from '../index';
import { Flags } from '../../index';
import log from '../../helpers/log';
import { readFile } from '../methods';
import checkMethod from './method';

const check: CommandHandler = async (args: string[], flags: Flags): Promise<Result> => {
  log.success`Checking settings file - ${flags['--target']} by main file - ${flags['--main']}`;
  
  const readMainResult = await readFile(flags['--main']!);
  if (readMainResult.message) {
    log.error`Failed to read file`;
    log.error`Error: ${readMainResult.message}`;
    return Result.error()
  }
  
  const readTargetResult = await readFile(flags['--target']!);
  if (readTargetResult.message) {
    log.error`Failed to read file`;
    log.error`Error: ${readTargetResult.message}`;
    return Result.error()
  }

  const main = readMainResult.data;
  const target = readTargetResult.data;

  return checkMethod({ target, main }, flags);
}

export default check;
