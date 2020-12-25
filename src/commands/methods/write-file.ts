import fs from 'fs';
import util from 'util';
import path from 'path';

import { Result } from '../index';

const writeFilePromise = util.promisify(fs.writeFile);

const writeFile = async (targetFilePath: string, data: any): Promise<Result> => {
  const targetNaturalPath = path.resolve(process.cwd(), targetFilePath);

  try {
    await writeFilePromise(targetNaturalPath, data, { encoding: 'utf-8' });

    return Result.passed()
  } catch (err) {
    return Result.error(err.message)
  }
}

export default writeFile;