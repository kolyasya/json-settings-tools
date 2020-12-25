const exceptObjectKeys = <T>(object: T, keys: Array<string>): T => {
  const resultObject: any = {};
  const restKeys = Object.keys(object).filter((key: string) => !keys.includes(key));
  const resultKeysOrder = keys.concat(restKeys);

  resultKeysOrder.map((key: string) => {
    resultObject[key] = object[key as keyof T];
  });

  return resultObject;
};

export default exceptObjectKeys;