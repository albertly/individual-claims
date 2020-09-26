import React, { useState } from 'react';
import NavBreadcrumb from './NavBreadcrumb'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';

import './Second.css';

function Second(props: any): React.ReactElement {

    let { path, url } = useRouteMatch();
    console.log('path', path, url);
    console.log('props', props);
    
    return (
        <div>
            <NavBreadcrumb />
            <div style={{position: 'relative'}}>
            <TransitionGroup>
                <CSSTransition key={props.location.key}
                    classNames="slide"
                    timeout={1000}>
                    <Switch location={props.location}>
                        <Route exact path={`${path}`}>
                            <InsDetails />
                        </Route>
                        <Route exact path={`${path}/treatdetails`}>
                            <TreatDetails />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            </div>
        </div>
    )
}
export default Second;