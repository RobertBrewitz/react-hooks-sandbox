import { useMemo, useCallback, useState } from 'react';

let cachedValue;

const echoValue = (input) => cachedValue = input;

const useLocalStorage = (key, initialValue) => {
  const _setItem = window.localStorage.setItem;

  const storedValue = useMemo(() => {
    try {
      const item = window.localStorage.getItem(key);
      cachedValue = item ? JSON.parse(item) : initialValue;
      return cachedValue;
    } catch (error) {
      console.error(error);
      cachedValue = initialValue;
    }
  }, [cachedValue]);

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      cachedValue = valueToStore;
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
