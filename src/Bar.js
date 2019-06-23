import React from 'react';
import useLocalStorage from './useLocalStorage';

const Bar = (props) => {
  const [value, setValue] = useLocalStorage('key', 0);

  return (
    <div>
      <button onClick={() => setValue(value-1)}>-</button>
      {`same: ${value}`}
      <button onClick={() => setValue(value+1)}>+</button>
    </div>
  );
}

export default Bar;
