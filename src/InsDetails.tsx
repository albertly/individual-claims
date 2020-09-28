import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './InsDetails.css';
import { Form } from 'react-bootstrap';

function InsDetails(): React.ReactElement {
  return (
    <>
      <section>
        <div className="row row-one">
          <div className="col-md-3 col-xs-12 col-first">
            פרטי המבוטח לגביו מוגשת התביעה
          </div>
          <div className="col-md-3 col-xs-12 col-bl">
            <Form>
              <div className="mb-1">
                <Form.Check
                  className="form-control form-control-lg"
                  size={10}
                  inline
                  label="123456789"
                  type="radio"
                  id={`inline--1`}
                />
              </div>
            </Form>
          </div>
          <div className="col-md-3 col-xs-12 col-bl">3 of 4</div>
          <div className="col-md-3 col-xs-12 col-last">4 of 4</div>
        </div>
        <div className="row row-two">
          <div className="col-md-3 col-xs-12 col-first">
            פרטי יצירת קשר עם המבוטח
          </div>
          <div className="col-md-9 col-xs-12 col-last">2 of 2</div>
        </div>
      </section>
    </>
  );
}
export default InsDetails;
