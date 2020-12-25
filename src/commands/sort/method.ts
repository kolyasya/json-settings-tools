import { deflatObject, flatObject, parseJson, sortObjectByKeys, exceptObjectKeys } from '../methods';

import { Flags } from '../../index';

import log from '../../helpers/log';
import { Result } from '..';

const sortMethod = async (target: any, flags: Flags): Promise<Result>  => {
  const exceptKeys = flags['--except'] ? flags['--except'].replace(/\s/gim, '').split(',') : null;

  const parseResult = parseJson(target);
  if (!parseResult.passed) {
    log.error('Failed to parse json. Check syntax');
    log.error(`Error: ${parseResult.message!}`);
    return Result.error();
  }

  const flattedTarget = flatObject(parseResult.data);
  const sortedTarget = sortObjectByKeys(flattedTarget);
  
  const deflattedTarget = deflatObject(sortedTarget);

  let resultTarget = deflattedTarget;

  if (exceptKeys) {
    resultTarget = exceptObjectKeys(deflattedTarget, exceptKeys);
  }

  const targetJson = JSON.stringify(resultTarget, null, 2);

  log.success(`${flags['--target']} was successfully sorted and prettyfied`);
  
  return Result.data(targetJson);
}

export default sortMethod;