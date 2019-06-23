import React from 'react';
import Consumer from './Consumer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Consumer.test.js', () => {
  test('works', () => {
    const wrapper = shallow(<Consumer />);
    expect(wrapper.html()).toMatch('1');
    expect(wrapper.html()).toMatch('2');
    expect(wrapper.html()).toMatch('3');
  });
});
