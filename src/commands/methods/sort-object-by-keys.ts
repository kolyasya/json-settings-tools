const sortObjectByKeys = <T>(object: T, exceptKeys: Array<string> | null): T => {
  const objectKeys = Object.keys(object);
  let exceptedKeys: Array<string> = [];
  if (exceptKeys) {
    exceptedKeys = objectKeys.filter(key => exceptKeys.some(except => new RegExp(`^${except}.*`, 'gim').test(key)));
  }

  const sortedKeys = objectKeys.sort(
    (a: any, b: any) => a.toLowerCase() < b.toLowerCase()
      ? -1
      : a.toLowerCase() > b.toLowerCase()
        ? 1
        : 0
  ).filter(key => !exceptedKeys.includes(key));
  
  return exceptedKeys.concat(sortedKeys).reduce((acc, key) => ({ ...acc, [key]: object[key as keyof T] }), {}) as T
}

export default sortObjectByKeys;