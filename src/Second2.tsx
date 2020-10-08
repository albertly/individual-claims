import React, { useState, useEffect, Component } from 'react';
import NavBreadcrumb from './NavBreadcrumb';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';
import DocAttach from './DocAttach';
import Payment from './Payment';
import Finish from './Finish';
import { Pages } from './shared/constants';

import './Second.css';

enum Direction {
  Forward = 0,
  Back = 1,
}

export default class Second2 extends Component {
  state = {
    direction: Direction.Forward,
    page: 0,
  };

  componentWillMount() {
    this.setState({
      direction:
        Pages[window.location.pathname] - this.state.page > 0
          ? Direction.Forward
          : Direction.Back,
    });
    this.setState({ page: Pages[window.location.pathname] });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.page !== Pages[window.location.pathname]) {
      this.setState({
        direction:
          Pages[window.location.pathname] - this.state.page > 0
            ? Direction.Forward
            : Direction.Back,
      });
      this.setState({ page: Pages[window.location.pathname] });
    }
  }

  componentDidMount() {
    this.setState({
        direction:
          Pages[window.location.pathname] - this.state.page > 0
            ? Direction.Forward
            : Direction.Back,
      });
      this.setState({ page: Pages[window.location.pathname] });
  }

  componentWillUnmount() {}

  render() {
    return (
      <>
        <NavBreadcrumb />
        <Route
          render={({ location }) => {
            return (
              <>
                <PageTransition
                  preset={
                    this.state.direction === Direction.Forward
                      ? 'moveToLeftFromRight'
                      : 'moveToRightFromLeft'
                  }
                  transitionKey={location.key}
                >
                  <Route exact path={'/second'} component={InsDetails} />

                  <Route
                    exact
                    path={`/second/treatdetails`}
                    component={TreatDetails}
                  />
                  <Route exact path={`/second/docs`} component={DocAttach} />
                  <Route exact path={`/second/payment`} component={Payment} />
                  <Route exact path={`/second/finish`} component={Finish} />
                </PageTransition>
              </>
            );
          }}
        />
      </>
    );
  }
}
