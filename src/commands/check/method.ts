import chalk from 'chalk';

import { Result } from '..';
import log from '../../helpers/log';
import { Flags } from '../../index';
import { flatObject, parseJson } from '../methods';

const checkMethod = ({ main, target }: { main: any, target: any }, flags: Flags): Result => {
  const parsemainResult = parseJson(main);
  if (parsemainResult.message) {
    log.error('Failed to parse main json. Check syntax');
    log.error(`Error: ${parsemainResult.message!}`);
  
    return Result.error();
  }
  
  const parseTargetResult = parseJson(target);
  if (parseTargetResult.message) {
    log.error('Failed to parse target json. Check syntax');
    log.error(`Error: ${parseTargetResult.message!}`);

    return Result.error();
  }

  const flattedmain = flatObject(parsemainResult.data);
  const flattedTarget = flatObject(parseTargetResult.data);
  const mainKeys = Object.keys(flattedmain);

  const missingKeys = mainKeys.filter(key => {
    const targetValue = flattedTarget[key];
    return targetValue === undefined;
  });

  if (!missingKeys.length) {
    log.success('Target settings are valid and ready to use');

    return Result.passed();
  }

  log.error('Target settings are invalid');
  log.error(`Missing keys:
${missingKeys.map(key => chalk.red(`${key}`)).join('\n')}
`);

  return Result.error();
}

export default checkMethod;