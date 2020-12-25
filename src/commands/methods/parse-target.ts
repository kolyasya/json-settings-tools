import { Result } from '../index';

const parseJson = (jsonString: string): Result => {
  try {
    const parsedJson = JSON.parse(jsonString);
    return Result.data(parsedJson);
  } catch (err) {
    return Result.error(err.message);
  }
}

export default parseJson;