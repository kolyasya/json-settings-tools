import _ from 'lodash';

const deflatObject = (object: any) => {
  const resultObject = {};

  Object.keys(object).map(key => {
    _.set(resultObject, key, object[key]);
  })

  return resultObject;
}

export default deflatObject;
