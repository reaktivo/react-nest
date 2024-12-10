import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactNode,
} from 'react'

type Props = {
  children?: ReactNode
}

export default function Nest(props: Props) {
  return (
    <Fragment>
      {Children.toArray(props.children)
        .reverse()
        .reduce((child, parent) => {
          return isValidElement(parent)
            ? cloneElement(parent, parent.props as Partial<unknown>, child)
            : child;
        }, <Fragment />)}
    </Fragment>
  )
}