import React, { Children, cloneElement, Fragment, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Nest(props: Props) {
  return (
    <Fragment>
      {Children.toArray(props.children)
        .reverse()
        .reduce((child, parent) => {
          const el = parent as React.ReactElement;
          if (!el || !el.type) {
            return child;
          }
          const { children, ...props } = el.props;
          return cloneElement(el, props, [children, child]);
        }, null)}
    </Fragment>
  );
}
