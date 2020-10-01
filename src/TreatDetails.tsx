import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';

function TreadDetails(): React.ReactElement {
  let history = useHistory();

  function handleClick() {
    history.push('/second');
  }

  return (
    <main aria-label="פרטי טיפול">
      <section className="row" aria-labelledby="treatDetails">
        <h3 id="treatDetails" className="col-3 col-first">
          פרטי הטיפול/ים
        </h3>
        <div className="col col-last col-text-help">
          <p>
            כדי שנוכל להתקדם בזריזות, אנחנו מבקשים שסריקה או צילום של המסמכים
            תהיה ההישג ידך:
          </p>
        </div>
      </section>
      <section className="row">
        <div className="col-3 col-first">1 of 2</div>
        <div className="col col-last">2 of 2</div>
      </section>
      {/* <Button variant="primary" onClick={handleClick}>המשך</Button> */}
    </main>
  );
}
export default TreadDetails;
