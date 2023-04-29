import { isBoolean, isEmpty, isNumber, isObject, isString, isUndefined } from "lodash";


function isEmptyDeep(data) {
  if (isString(data) || isNumber(data) || isBoolean(data)) {
    return false;
  }

  if (isUndefined(data) || isEmpty(data)) {
    return true;
  }

  if (isObject(data)) {
    return Object.keys(data).every(key => isEmptyDeep(data[key]))
  }

  return false;
}

export default isEmptyDeep;
