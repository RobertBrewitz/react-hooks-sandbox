import React from 'react';
import useLocalStorage, { clearTriggers, triggers } from './useLocalStorage';
import { act } from 'react-dom/test-utils';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const KEY = 'useLocalStorage';
const ANOTHER_KEY = 'useAnotherLocalStorage';

const Wrapper = (props) => {
  return <div hook={props.hook()} />;
}

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearTriggers();
  });

  test('loads KEY from local storage into hook state', () => {
    const expected = { foo: 'bar' };
    window.localStorage.setItem(KEY, JSON.stringify(expected));
    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, '')} />
    );
    const [value, setValue]  = wrapper.find('div').props().hook;
    expect(value).toEqual(expected);
  });

  test('loads initial value into hook state, if KEY has no data in local storage', () => {
    const expected = { foo: 'bar' };
    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, expected)} />
    );
    const [value]  = wrapper.find('div').props().hook;
    expect(value).toEqual(expected);
  });

  test('the hooks setter function, properly updates component state and localStorage KEY', () => {
    const expected = { foo: 'bar' };

    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, '')} />
    );

    let [value, setValue]  = wrapper.find('div').props().hook;
    act(() => setValue(expected));
    wrapper.update();
    [value, setValue]  = wrapper.find('div').props().hook;

    expect(JSON.parse(window.localStorage.getItem(KEY))).toEqual(expected);
    expect(value).toEqual(expected);
  });

  test('when KEY in localStorage is updated by a component, also update other components using the hook', () => {
    const expected = { foo: 'bar' };

    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, true)} />
    );

    const otherWrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, true)} />
    );

    let [value]  = wrapper.find('div').props().hook;
    let [otherValue, otherSetValue]  = otherWrapper.find('div').props().hook;

    expect(value).toEqual(true);
    expect(otherValue).toEqual(true);

    act(() => otherSetValue(false));
    wrapper.update();
    otherWrapper.update();

    [value]  = wrapper.find('div').props().hook;
    [otherValue]  = otherWrapper.find('div').props().hook;

    expect(value).toEqual(false);
    expect(otherValue).toEqual(false);
  });

  test('allows for multiple localStorage keys', () => {
    const expected = { foo: 'bar' };

    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, true)} />
    );

    const otherWrapper = mount(
      <Wrapper hook={() => useLocalStorage(ANOTHER_KEY, false)} />
    );

    const [value, setValue]  = wrapper.find('div').props().hook;
    const [otherValue, otherSetValue]  = otherWrapper.find('div').props().hook;

    expect(value).not.toEqual(otherValue);
  });

  test('a localStorage key ever only updates itself, not other keys', () => {
    const expected = { foo: 'bar' };

    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, expected)} />
    );

    const otherWrapper = mount(
      <Wrapper hook={() => useLocalStorage(ANOTHER_KEY, expected)} />
    );

    let [value, setValue]  = wrapper.find('div').props().hook;
    let [otherValue]  = otherWrapper.find('div').props().hook;

    expect(value).toEqual(expected);
    expect(otherValue).toEqual(expected);
    act(() => setValue(false));
    wrapper.update();
    otherWrapper.update();
    [value]  = wrapper.find('div').props().hook;
    [otherValue]  = otherWrapper.find('div').props().hook;

    expect(value).toEqual(false);
    expect(otherValue).toEqual(expected);
  });

  test('when component unmounts, it clears ITS OWN setStore function from triggers', () => {
    const expected = { foo: 'bar' };
    const wrapper = mount(
      <Wrapper hook={() => useLocalStorage(KEY, expected)} />
    );
    mount(
      <Wrapper hook={() => useLocalStorage(KEY, expected)} />
    );
    wrapper.unmount();
    expect(triggers[KEY].length).toEqual(1);
  });
});
