import React, { createContext, useContext } from 'react';
import { render } from 'react-testing-library';
import Nest from '../src';

describe('Nest', () => {
  it('should nest regular dom children', () => {
    const $ = render(
      <Nest>
        <div title="first" />
        <div title="second" />
        <div title="third" />
      </Nest>
    );

    const first = $.getByTitle('first');
    const second = $.getByTitle('second');
    const third = $.getByTitle('third');

    expect(first.contains(second)).toBeTruthy();
    expect(second.contains(third)).toBeTruthy();
    expect(third.childNodes).toHaveLength(0);
  });

  it('should nest context providers', () => {
    const Context1 = createContext('');
    const Context2 = createContext('');

    const Consumer1 = (props: any) => {
      const ctx = useContext(Context1);
      return <div {...props} title={ctx} />;
    };

    const Consumer2 = (props: any) => {
      const ctx = useContext(Context2);
      return <div {...props} title={ctx} />;
    };

    const $ = render(
      <Nest>
        <Context1.Provider value={'contextA'} />
        <Context2.Provider value={'contextB'} />
        <Consumer1 />
        <Context1.Provider value={'contextC'} />
        <Consumer2 />
        <Consumer1 />
      </Nest>
    );

    const first = $.getByTitle('contextA');
    const second = $.getByTitle('contextB');
    const third = $.getByTitle('contextC');

    expect(first.contains(second)).toBeTruthy();
    expect(second.contains(third)).toBeTruthy();
    expect(third.childNodes).toHaveLength(0);

    console.log($.debug());
  });
});
