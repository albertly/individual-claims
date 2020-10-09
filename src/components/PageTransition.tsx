import React from 'react';
import { PageTransition as PT } from '@steveeeie/react-page-transition';

function PageTransition(props: any): React.ReactElement {
  if (!props.disabled) {
    return (
      <PT preset={props.preset} transitionKey={props.transitionKey}>
        {props.children}
      </PT>
    );
  }
  return <>{props.children}</>;
}

export default PageTransition;
