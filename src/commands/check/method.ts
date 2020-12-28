import chalk from 'chalk';

import { Result } from '..';
import log from '../../helpers/log';
import { Flags } from '../../index';
import { flatObject, parseJson } from '../methods';

const checkMethod = ({ main, target }: { main: any, target: any }, flags: Flags): Result => {
  const parseMainResult = parseJson(main);
  if (parseMainResult.message) {
    log.error`Failed to parse main json. Check syntax`;
    log.error`Error: ${parseMainResult.message!}`;
  
    return Result.error();
  }
  
  const parseTargetResult = parseJson(target);
  if (parseTargetResult.message) {
    log.error`Failed to parse target json. Check syntax`;
    log.error`Error: ${parseTargetResult.message!}`;

    return Result.error();
  }

  const flattenedMain = flatObject(parseMainResult.data);
  const flattenedTarget = flatObject(parseTargetResult.data);
  const mainKeys = Object.keys(flattenedMain);

  const missingKeys = mainKeys.filter(key => {
    const targetValue = flattenedTarget[key];
    return targetValue === undefined;
  });

  if (!missingKeys.length) {
    log.success`Target settings are valid and ready to use`;

    return Result.passed();
  }

  log.error`Target settings are invalid`;
  log.error`Missing keys:
${missingKeys.map(key => chalk.red(`${key}`)).join('\n')}
`;

  return Result.error();
}

export default checkMethod;
