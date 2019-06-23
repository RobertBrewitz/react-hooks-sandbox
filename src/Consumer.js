import React, { useContext, useEffect, useCallback, useReducer } from 'react';

import { ContextOne, ContextTwo, ContextThree } from './App';

const Consumer = (props) => {
  const one = useContext(ContextOne);
  const [oneValue, oneSetValue] = useReducer(one.increment, one.value);

  const two = useContext(ContextTwo);
  const [twoValue, twoSetValue] = useReducer(two.increment, two.value);

  const three = useContext(ContextThree);
  const [threeValue, threeSetValue] = useReducer(three.increment, three.value);

  return (
    <div>
      <p>{`One: ${oneValue}`}</p>
      <button onClick={() => oneSetValue()}>{'woop'}</button>
      <p>{`Two: ${twoValue}`}</p>
      <button onClick={() => twoSetValue()}>{'woop'}</button>
      <p>{`Three: ${threeValue}`}</p>
      <button onClick={() => threeSetValue()}>{'woop'}</button>
    </div>
  );
};

export default Consumer;
