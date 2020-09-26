import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

import styles from './TreatDetails.module.css';

function TreadDetails(): React.ReactElement {
    let history = useHistory();

    function handleClick() {
        history.push("/second");
    }

    return (
        <div>
            <section>

                <div className={`row justify-content-center ${styles.row_one}`} >
                    <div className="col-3 col-first">
                        רגע לפני שמתחילים...
    </div>
                    <div className="col col-last col-text-help">
                        <p>
                            כדי שנוכל להתקדם בזריזות, אנחנו מבקשים שסריקה או צילום של המסמכים תהיה ההישג ידך:
        </p>
                    </div>
                </div>
                <div className={`row ${styles.row_two}`}>
                    <div className="col-3 col-first">
                        1 of 2
    </div>
                    <div className="col col-last">
                        2 of 2
    </div>
                </div>
            </section>
            {/* <Button variant="primary" onClick={handleClick}>המשך</Button> */}
        </div>
    )
}
export default TreadDetails;