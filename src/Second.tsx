import React, { useState } from 'react';
import NavBreadcrumb from './NavBreadcrumb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';
import DocAttach from './DocAttach';
import Payment from './Payment'

import './Second.css';

function Second(props: any): React.ReactElement {
  let { path, url } = useRouteMatch();

  return (
    <>
      <NavBreadcrumb />
      <div style={{ position: 'relative' }}>
        <TransitionGroup>
          <CSSTransition
            key={props.location.key}
            classNames="slide"
            timeout={1000}
          >
            <Switch location={props.location}>
              <Route exact path={`${path}`}>
                <InsDetails />
              </Route>
              <Route exact path={`${path}/treatdetails`}>
                <TreatDetails />
              </Route>
              <Route exact path={`${path}/docs`}>
                <DocAttach />
              </Route>
              <Route exact path={`${path}/payment`}>
                <Payment />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}
export default Second;
