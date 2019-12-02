const isNumber = val => typeof val === 'number';

const isString = value => typeof value === 'string';

const isBoolean = value => typeof value === 'boolean';

const isArray = value => Array.isArray(value);

const isObject = value => {
  if(isArray(value)) return false;
  if(!value) return false;
  return typeof value === 'object';
};

const isFunction = value => typeof value === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
};
