import React, { useState, useEffect, useContext } from 'react';
import NavBreadcrumb from './NavBreadcrumb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PageTransition from './components/PageTransition';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';
import DocAttach from './DocAttach';
import Payment from './Payment';
import Finish from './Finish';
import { Pages, Paths } from './shared/constants';

import {
  AppContext,
  NavigationType,
  Types,
  Direction,
} from './shared/contexApp';

import './Second.css';

function Second(props: any): React.ReactElement {
  const [direction, setDirection] = useState(Direction.Forward);
  const [page, setPage] = useState<number>(0);
  const { state, dispatch } = useContext(AppContext);

  let { path, url } = useRouteMatch();

  return (
    <>
      <NavBreadcrumb />
      {/* <div data-style={{ position: 'relative' }}> */}
      {/* <CSSTransition            
            key={props.location.key}            
            classNames={
              direction === Direction.Forward ? 'slide' : 'slide-back'
            }
            timeout={1000}
          > */}

      <Route
        render={({ location }) => {
          console.log('Current page', location.pathname);
          console.log(
            'direction',
            state.navigation.direction === Direction.Forward
              ? 'moveToLeftFromRight'
              : 'moveToRightFromLeft'
          );
          return (
            <>
              <PageTransition
                disabled={true}
                preset={
                  state.navigation.direction === Direction.Forward
                    ? 'moveToLeftFromRight'
                    : 'moveToRightFromLeft'
                }
                // enterAnimation={
                //   state.navigation.direction === Direction.Forward
                //     ? 'moveToLeft'
                //     : 'moveToRight'
                // }
                // exitAnimation={
                //   state.navigation.direction === Direction.Forward
                //     ? 'moveToLeft'
                //     : 'moveToRight'
                // }
                transitionKey={location.key}
              >
                <Switch location={location}>
                  <Route exact path={Paths.INSURED} component={InsDetails} />

                  <Route
                    exact
                    path={Paths.TREATMENT}
                    component={TreatDetails}
                  />
                  <Route exact path={Paths.DOCS} component={DocAttach} />
                  <Route exact path={Paths.PAYMENT} component={Payment} />
                  <Route exact path={Paths.FINISH} component={Finish} />
                </Switch>
              </PageTransition>
            </>
          );
        }}
      />
      {/* </div> */}
    </>
  );
}
export default Second;
