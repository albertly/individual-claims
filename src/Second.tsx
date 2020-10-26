import React, { useState, useEffect, useContext } from 'react';
import NavBreadcrumb from './NavBreadcrumb';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import loadable from '@loadable/component';
import { PrerenderedComponent } from 'react-prerendered-component';

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

const prerenderedLoadable = (dynamicImport: any) => {
  const LoadableComponent = loadable(dynamicImport);
  return React.memo(props => (
    // you can use the `.preload()` method from react-loadable or react-imported-component`
    <PrerenderedComponent live={LoadableComponent.load()}>
      <LoadableComponent {...props} />
    </PrerenderedComponent>
  ));
};

function Second(props: any): React.ReactElement {
  const [direction, setDirection] = useState(Direction.Forward);
  const [page, setPage] = useState<number>(0);
  const { state, dispatch } = useContext(AppContext);

  let { path, url } = useRouteMatch();

  // const InsDetails = prerenderedLoadable(() => import('./InsDetails'));
  // const TreatDetails = prerenderedLoadable(() => import('./TreatDetails'));
  // const DocAttach = prerenderedLoadable(() => import('./DocAttach'));
  // const Payment = prerenderedLoadable(() => import('./Payment'));
  // const Finish = prerenderedLoadable(() => import('./Finish'));

  return (
    <>
      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-panel hsg-panel-light">
            שדות בטופס המסומנים בכוכבית הינם שדות חובה{' '}
            <span className="hsg-form-asterix">*</span>
          </div>
        </div>
      </div>

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
          return (
            <>
              <PageTransition
                disabled={true}
                preset={
                  state.navigation.direction === Direction.Forward
                    ? 'moveToLeftFromRight'
                    : 'moveToRightFromLeft'
                }
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
                  <Redirect to={Paths.MAIN} />
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
