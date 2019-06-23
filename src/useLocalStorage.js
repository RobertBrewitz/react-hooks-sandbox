import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

const triggers = {};

const useLocalStorage = (key, initialValue) => {
  const [store, putStore] = useState(() => {
    return initialValue;
  });

  useEffect(() => {
    triggers[key] = triggers[key] || [];
    triggers[key] = [...triggers[key], putStore];

    const item = window.localStorage.getItem(key);
    const localStore = item
      ? JSON.parse(item)
      : initialValue;

    putStore(localStore);

    return () => {}
  }, []);

  const handleData = useCallback((input) => {
    triggers[key].map(trigger => {
      trigger(input)
    });

    try {
      window.localStorage.setItem(key, JSON.stringify(input));
    } catch (e) {
      console.log(e);
    }
  });

  return [store, handleData];
}

export default useLocalStorage;
