import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import './InsDetails.css';

function InsDetails(): React.ReactElement {
    let history = useHistory();

    function handleClick() {
        history.push("/second");
    }

    return (
        <>
            <section>
                <div className="row row-one" >
                    <div className="col-3 col-first">
                        1 of 2
                    </div>
                    <div className="col">
                        2 of 2
                    </div>
                    <div className="col">
                        3 of 4
                    </div>
                    <div className="col col-last">
                        4 of 4
                    </div>
                </div>
                <div className="row row-two">
                    <div className="col-3 col-first">
                        1 of 2
                    </div>
                    <div className="col col-last">
                        2 of 2
                    </div>
                </div>
            </section>
            <Button variant="primary" onClick={handleClick}>המשך</Button>
        </>
    )
}
export default InsDetails;