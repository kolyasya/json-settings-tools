import _ from 'lodash';

const flatObject = (object: any, baseKey: string = ''): any => {
  return Object.keys(object).reduce((r, key) => {
    if (_.isObject(object[key]) && Object.keys(object[key]).length > 0) {
      return {
        ...r,
        ...flatObject(object[key], `${baseKey}${key}.`),
      };
    }

    return {
      ...r,
      [`${baseKey}${key}`]: object[key],
    };
  }, {});
};

export default flatObject;
