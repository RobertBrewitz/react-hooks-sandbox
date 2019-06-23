import React from 'react';
import Baz from './Baz';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export const ContextOne = React.createContext(1);
export const ContextTwo = React.createContext(2);
export const ContextThree = React.createContext(3);

export const contexts = [ContextOne, ContextTwo, ContextThree];


export const Providers = (props) => {
  return props.contexts.reduce((memo, context) => {
    return <context.Provider value={context._currentValue}>{memo}</context.Provider>
  }, props.children);

};

describe('Baz.test.js', () => {
  test('works', () => {
    const wrapper = mount(
      <Providers contexts={contexts}>
        <Baz />
      </Providers>
    );

    expect(wrapper.html()).toMatch('1');
    expect(wrapper.html()).toMatch('2');
    expect(wrapper.html()).toMatch('3');
    console.log(wrapper.html());
  });
});
