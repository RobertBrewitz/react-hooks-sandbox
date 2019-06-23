import React, { useContext } from 'react';

import { ContextOne, ContextTwo, ContextThree } from './Baz.test.js';

const Baz = (props) => {
  const one = useContext(ContextOne);
  const two = useContext(ContextTwo);
  const three = useContext(ContextThree);

  return (
    <div>
      <p>{`One: ${one}`}</p>
      <p>{`Two: ${two}`}</p>
      <p>{`Three: ${three}`}</p>
    </div>
  );
};

export default Baz;
