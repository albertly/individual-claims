import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function DocAttach(): React.ReactElement {
    let history = useHistory();

    function handleClick() {
        history.push("/second");
    }

    return (
        <div>
            DocAttach
            <Button variant="primary" onClick={handleClick}>המשך</Button>
        </div>
    )
}
export default DocAttach;