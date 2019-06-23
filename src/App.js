import React from 'react';
import './App.css';
import Foo from './Foo';
import Bar from './Bar';
import useLocalStorage from './useLocalStorage';

function App() {
  const [value, setValue] = useLocalStorage('other', 0);

  return (
    <div className="App">
      <button onClick={() => setValue(value-1)}>-</button>
      {`other: ${value}`}
      <button onClick={() => setValue(value+1)}>+</button>
      <br/>
      <br/>
      <Foo />
      <br/>
      <Bar />
    </div>
  );
}

export default App;
