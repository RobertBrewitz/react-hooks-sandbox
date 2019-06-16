import React from 'react';
import useLocalStorage from './useLocalStorage';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const LOCAL_STORAGE_KEY = 'useLocalStorage';

const HookWrapper = (props) => {
  const result = props.hook('foo', 'bar');

  return <div hook={result} />;
};

describe('useLocalStorage', () => {
  test('loads initial value from local storage', () => {
    const expected = { foo: 'bar' };

    window.localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(expected)
    );

    const wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage(LOCAL_STORAGE_KEY, '')} />
    );

    const [value]  = wrapper.getElement('div').props.hook;

    expect(value).toEqual(expected);
  });

  test('sets initial value properly if localStorage item is not set', () => {
    const expected = { foo: 'bar' };


    const wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage(LOCAL_STORAGE_KEY, expected)} />
    );

    const [value]  = wrapper.getElement('div').props.hook;

    expect(value).toEqual(expected);
  });

  test('setValue properly sets item LOCAL_STORAGE_KEY', () => {
    const expected = { foo: 'bar' };

    const wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage(LOCAL_STORAGE_KEY, '')} />
    );

    const [value, setValue]  = wrapper.getElement('div').props.hook;

    setValue(expected);

    expect(value).toEqual(expected);
    expect(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))).toEqual(expected);
  });

  test('when key in localStorage updates by other means, also refresh local state', () => {
    const expected = { foo: 'bar' };

    const wrapper = shallow(
      <HookWrapper hook={() => useLocalStorage(LOCAL_STORAGE_KEY, true)} />
    );

    const otherWrapper = shallow(
      <HookWrapper hook={() => useLocalStorage(LOCAL_STORAGE_KEY, true)} />
    );

    const [value, setValue]  = wrapper.getElement('div').props.hook;
    const [otherValue, otherSetValue]  = otherWrapper.getElement('div').props.hook;

    expect(value).toEqual(otherValue);

    otherSetValue(false);

    expect(value).toEqual(otherValue);
  });
});
