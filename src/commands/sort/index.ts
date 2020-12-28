import { Flags } from '../../index';
import log from '../../helpers/log';
import { CommandHandler, Result } from '../index';
import { readFile, writeFile } from '../methods';
import sortMethod from './method';

const sort: CommandHandler = async (args: string[], flags: Flags): Promise<Result> => {
  log.success(`Sorting settings file - ${flags['--target']}`);
    
  const readFileResult = await readFile(flags['--target']!);
  if (readFileResult.message) {
    log.error`Failed to read file`;
    log.error`Error: ${readFileResult.message}`;

    return Result.error();
  }
  
  const targetJsonResult = await sortMethod(readFileResult.data, flags);
  if (targetJsonResult.message) {
    log.error`Failed to sort settings`;
    log.error`Error: ${targetJsonResult.message}`;

    return Result.error();
  }

  const writeFileResult = await writeFile((flags['--output'] || flags['--target'])!, targetJsonResult.data)
  if (writeFileResult.message) {
    log.error`Failed to write file`;
    log.error`Error: ${writeFileResult.message}`;

    return Result.error();
  } else {
    log.success`It was saved to ${flags['--output'] || flags['--target']}`;

    return Result.passed();
  }
}

export default sort;
