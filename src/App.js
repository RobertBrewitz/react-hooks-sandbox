import React from 'react';
import './App.css';
import Foo from './Foo';
import Bar from './Bar';
import useLocalStorage from './useLocalStorage';
import Consumer from './Consumer';

const setup = (initial) => {
  const state = {
    value: initial,
    increment: () => {
      state.value += 1;
      return state.value;
    },
  };

  return state;
};

export const ContextOne = React.createContext(setup(1));

export const ContextTwo = React.createContext(setup(2));
export const ContextThree = React.createContext(setup(3));
export const contexts = [ContextOne, ContextTwo, ContextThree];

export const Providers = (props) => {
  return props.contexts.reduce((memo, context) => {
    return <context.Provider value={context._currentValue}>{memo}</context.Provider>
  }, props.children);

};

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
      <br/>
      <br/>
      <br/>
      <br/>
      <Providers contexts={contexts}>
        <Consumer />
      </Providers>
    </div>
  );
}

export default App;
