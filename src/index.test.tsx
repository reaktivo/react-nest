// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest'
import { createContext, useContext } from 'react'
import { render, screen } from '@testing-library/react'
import Nest from '.'

describe('Nest', () => {
  it('should nest regular dom children', () => {
    render(
      <Nest>
        <div title="first" />
        <div title="second" />
        <div title="third" />
      </Nest>
    )

    const first = screen.getByTitle('first')
    const second = screen.getByTitle('second')
    const third = screen.getByTitle('third')

    expect(first.contains(second)).toBeTruthy()
    expect(second.contains(third)).toBeTruthy()
    expect(third.childNodes).toHaveLength(0)
  })

  it('should nest context providers', () => {
    const Context1 = createContext('')
    const Context2 = createContext('')

    const Consumer1 = (props: any) => {
      const ctx = useContext(Context1)
      return <div {...props} title={ctx} />
    };

    const Consumer2 = (props: any) => {
      const ctx = useContext(Context2)
      return <div {...props} title={ctx} />
    };

    render(
      <Nest>
        <Context1.Provider value={'contextA'} />
        <Context2.Provider value={'contextB'} />
        <Consumer1 />
        <Context1.Provider value={'contextC'} />
        <Consumer2 />
        <Consumer1 />
      </Nest>
    )

    const first = screen.getByTitle('contextA')
    const second = screen.getByTitle('contextB')
    const third = screen.getByTitle('contextC')

    expect(first.contains(second)).toBeTruthy()
    expect(second.contains(third)).toBeTruthy()
    expect(third.childNodes).toHaveLength(0)
  });

  it('should ignore non react node element children', () => {
    const { container } = render(
      <Nest>
        first
        <div title="second" />
      </Nest>
    )

    expect(container.innerHTML).not.toContain('first')
  })
})