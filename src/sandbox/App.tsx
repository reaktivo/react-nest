import React, { Consumer, createContext, useContext } from 'react'
import Nest from '..'

const Context1 = createContext('');
const Context2 = createContext('');

type ConsumerProps = {children?: React.ReactNode, text?: string}

const Consumer1 = (props: ConsumerProps) => {
  const ctx = useContext(Context1)
  return <div {...props} title={ctx}>{props.text} - {ctx} {props.children}</div>
};

const Consumer2 = (props: ConsumerProps) => {
  const ctx = useContext(Context2)
  return <div {...props} title={ctx}>{props.text} - {ctx} {props.children}</div>
};

export default function App() {

  return (
    <Nest>
      <Context1.Provider value={'contextA'} />
      <Context2.Provider value={'contextB'} />
      <Consumer1 text="Should be contextA"/>
      <Context1.Provider value={'contextC'} />
      <Consumer2 text="Should be contextB" />
      <Consumer1 text="Should be contextC" />
    </Nest>
  )
}
