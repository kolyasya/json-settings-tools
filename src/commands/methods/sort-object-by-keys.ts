const sortObjectByKeys = <T>(object: T, exceptKeys: string[] | null): T => {
  let objectKeys = Object.keys(object);
  if (exceptKeys) {
    objectKeys = objectKeys.filter(key => !exceptKeys.includes(key));
  }
  
  const sortedKeys = objectKeys.sort();

  return (exceptKeys || []).concat(sortedKeys).reduce((acc, key) => ({ ...acc, [key]: object[key as keyof T] }), {}) as T
}

export default sortObjectByKeys;