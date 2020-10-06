import React, { useState, useEffect } from 'react';
import NavBreadcrumb from './NavBreadcrumb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';
import DocAttach from './DocAttach';
import Payment from './Payment';
import { Pages } from './shared/constants';

import './Second.css';

enum Direction {
  Forward = 0,
  Back = 1,
}

function Second(props: any): React.ReactElement {
  const [direction, setDirection] = useState(Direction.Forward);
  const [page, setPage] = useState<number>(0);

  let { path, url } = useRouteMatch();


  useEffect(() => {
    setDirection(
      Pages[props.location.pathname] - page > 0
        ? Direction.Forward
        : Direction.Back
    );
    setPage(Pages[props.location.pathname]);
  }, [props.location]);


  return (
    <>
      <NavBreadcrumb />
      <div style={{ position: 'relative' }}>
        <TransitionGroup>
          <CSSTransition            
            key={props.location.key}            
            classNames={
              direction === Direction.Forward ? 'slide' : 'slide-back'
            }
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
