const sortObjectByKeys = <T>(object: T): T => {
  const objectKeys = Object.keys(object);
  const sortedKeys = objectKeys.sort();

  return sortedKeys.reduce((acc, key) => ({ ...acc, [key]: object[key as keyof T] }), {}) as T
}

export default sortObjectByKeys;