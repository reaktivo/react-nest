import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactNode,
} from 'react';

type Props = {
  children?: ReactNode;
};

export default function Nest(props: Props) {
  return (
    <Fragment>
      {Children.toArray(props.children)
        .reverse()
        .reduce(
          (child, parent) =>
            isValidElement(parent)
              ? cloneElement(parent, parent.props, child)
              : child,
          []
        )}
    </Fragment>
  );
}
