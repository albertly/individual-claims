import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function Payment(): React.ReactElement {
    let history = useHistory();

    function handleClick() {
        history.push("/second");
    }

    return (
        <div>
            Payment
            <Button variant="primary" onClick={handleClick}>המשך</Button>
        </div>
    )
}
export default Payment;