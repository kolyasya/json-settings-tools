import fs from 'fs';
import util from 'util';
import path from 'path';

import { Result } from '../index';

const readFilePromise = util.promisify(fs.readFile);

const readFile = async (targetFilePath: string): Promise<Result> => {
  const targetNaturalPath = path.resolve(process.cwd(), targetFilePath);
  try {
    const targetFile = await readFilePromise(targetNaturalPath, { encoding: 'utf-8' });

    return Result.data(targetFile);
  } catch (err) {
    return Result.error(err.message);
  }
}

export default readFile;