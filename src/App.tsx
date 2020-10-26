// import loadable from "@loadable/component";
// import { PrerenderedComponent } from "react-prerendered-component";

// const MyComponent = prerenderedLoadable(() => import("./MyComponent"));

import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { PrerenderedComponent } from 'react-prerendered-component';

import pjson from '../package.json';
import { DataProvider } from './shared/contextData';
import { AppProvider } from './shared/contexApp';
import Main from './Main';
import Second from './Second';

import { AppContext } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';


const prerenderedLoadable = (dynamicImport: any) => {
  const LoadableComponent = loadable(dynamicImport);
  return React.memo(props => (
    // you can use the `.preload()` method from react-loadable or react-imported-component`
    <PrerenderedComponent live={LoadableComponent.load()}>
      <LoadableComponent {...props} />
    </PrerenderedComponent>
  ));
};

function App(): React.ReactElement {
  const { state, dispatch } = useContext(AppContext);
  //const Second = prerenderedLoadable(() => import('./Second'));
  return (
    <AppProvider>
      <DataProvider>
        <div className="hsg-top">
          <div className="hsg-top-container">
            <a
              href="https://www.harel-group.co.il"
              className="hsg-top-logo"
              title="הראל"
            >
              <img alt="הראל" src="./assets/images/logo.png" />
            </a>
          </div>
        </div>

        <div className="hsg-container">
          <div className="hsg-header">
            <h1>הגשת תביעה לביטוח שיניים</h1>
          </div>

          <Switch>
            <Route exact path={Paths.MAIN} component={Main} />
            <Route component={Second} />
          </Switch>
        </div>
        <div className="hsg-app-bg"></div>
      </DataProvider>
    </AppProvider>
  );
}

export default App;
