import React, { useState } from 'react';
import NavBreadcrumb from './NavBreadcrumb'
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import InsDetails from './InsDetails';
import TreatDetails from './TreatDetails';

function Second(): React.ReactElement {

    let { path, url } = useRouteMatch();
    console.log('path', path);
    return (

        <div>
            <NavBreadcrumb />
            <Switch>
                <Route exact path={`${path}`}>
                    <InsDetails />
                </Route>
                <Route exact path={`${path}/treatdetails`}>
                    <TreatDetails />
                </Route>
            </Switch>
        </div>
    )
}
export default Second;