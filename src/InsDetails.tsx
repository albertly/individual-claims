import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function InsDetails(): React.ReactElement {
    let history = useHistory();

    function handleClick() {
        history.push("/second");
    }

    return (
        <div>
            InsDetails
            <Button variant="primary" onClick={handleClick}>המשך</Button>
        </div>
    )
}
export default InsDetails;