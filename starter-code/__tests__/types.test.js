const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('tells if a value is a string', () => {
      expect(isString('hello')).toBeTruthy();
      expect(isString('1')).toBeTruthy();
      expect(isString(1)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
    });

    it('tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('hello')).toBeFalsy();
      expect(isBoolean('1')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });

    it('tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray(['This', 'is', 'an', 'Array!'])).toBeTruthy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray('hello')).toBeFalsy();
      expect(isArray('1')).toBeFalsy();
      expect(isArray(1)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });

    it('kindly lets us know if this value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({
        key: 'value',
        key2: 2,
        key3: []
      })).toBeTruthy();
      expect(isObject(3)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
    });

    it('makes sure you know what a function is', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(true)).toBeFalsy();
      expect(isFunction(null)).toBeFalsy();
    })

  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    
    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can cast values to a string', () => {
    expect(castToString('hello')).toEqual('hello');
    expect(castToString(3)).toEqual('3');
    expect(castToString(true)).toEqual('true');
    expect(castToString([])).toEqual('[]');
    expect(castToString('')).toEqual('');
    expect(castToString({})).toEqual('{}');
  });

  it('throws if value is not castable to a string', () => {
    expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
    expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
  });

  it('can cast values to a boolean', () => {
    expect(castToBoolean(true)).toEqual(true);
    expect(castToBoolean(-1)).toEqual(true);
    expect(castToBoolean(1)).toEqual(true);
    expect(castToBoolean('1')).toEqual(true);
    expect(castToBoolean('false')).toEqual(true);
    expect(castToBoolean([])).toEqual(true);
    expect(castToBoolean({})).toEqual(true);
    expect(castToBoolean(() => {})).toEqual(true);
    expect(castToBoolean(false)).toEqual(false);
    expect(castToBoolean(0)).toEqual(false);
    expect(castToBoolean(null)).toEqual(false);
    expect(castToBoolean(undefined)).toEqual(false);
    expect(castToBoolean(NaN)).toEqual(false);
  });

  it('casts the value to an array! How DOPE!', () => {
    expect(castToArray(1)).toEqual([1]);
    expect(castToArray('hi')).toEqual(['hi']);
    expect(castToArray([])).toEqual([]);
    expect(castToArray({})).toEqual([{}]);
    expect(castToArray(true)).toEqual([true]);
  });

  it('throws if value is not castable to an array', () => {
    expect(() => castToArray(null)).toThrowErrorMatchingSnapshot();
    expect(() => castToArray(undefined)).toThrowErrorMatchingSnapshot();
    expect(() => castToArray(() => {})).toThrowErrorMatchingSnapshot();
  });
  
  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Array)).toEqual(castToArray);
    expect(getCaster(Promise)).toBeNull();
  });
});
