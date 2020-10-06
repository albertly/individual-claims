import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Payment(): React.ReactElement {
  let history = useHistory();

  function handleClick() {
    history.push('/second');
  }

  function handleBackClick() {
    history.push('/second/docs');
  }
  return (
    <div>
      <main aria-labelledby="h2_payment">
        <h2 id="h2_payment" className="hidden">
          תשלום
        </h2>
        <section  className="row min-vh-50" aria-labelledby="paymentBefore">
          <h3 id="paymentBefore" className="col-md-3 col-xs-12 col-first">
            אמצעי להעברת תשלום
          </h3>
          <div className="col-md-9 col-xs-12 col-last col-text-help">
            <p>תשלומי התביעה יועברו בהעברה בנקאית למשלם הפוליסה</p>
          </div>
        </section>
      </main>

      <footer className="d-flex justify-content-end align-items-center">
        <nav>
          <a
            className="link-icon-color"
            style={{ textDecoration: 'underline' }}
            href="#"
            onClick={handleBackClick}
          >
            חזרה אחורה
          </a>
          <span className="px-2">או</span>
          <Button variant="primary" onClick={handleClick}>
          אישור והגשת תביעה
          </Button>
        </nav>
      </footer>
    </div>
  );
}
export default Payment;
