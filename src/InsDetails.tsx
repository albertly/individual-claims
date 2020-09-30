import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './InsDetails.css';
import { Form } from 'react-bootstrap';

function InsDetails(): React.ReactElement {
  return (
    <>
      <main aria-label="פרטי המבוטח">
        <section className="row row-one" aria-labelledby="insFamily">
          <div id="insFamily" className="col-md-3 col-xs-12 col-first">
            פרטי המבוטח לגביו מוגשת התביעה
          </div>

          <div className="col-md-9 col-xs-12">
            <div className="row">
              <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                <div className="mt-md-4">
                  <Form.Check
                    className="pl-4"
                    inline
                    type="radio"
                    id={`inline--1`}
                  />
                  <label className="pt-2 mb-0" htmlFor={`inline--1`}>
                    123456789
                  </label>
                  <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                </div>
              </div>

              <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                <div className="mt-md-4">
                  <Form.Check
                    className="pl-4"
                    inline
                    type="radio"
                    id={`inline--2`}
                  />
                  <label className="pt-2 mb-0" htmlFor={`inline--2`}>
                    123456789
                  </label>
                  <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                </div>
              </div>

              <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                <div className="mt-md-4">
                  <Form.Check
                    className="pl-4"
                    inline
                    type="radio"
                    id={`inline--3`}
                  />
                  <label className="pt-2 mb-0" htmlFor={`inline--3`}>
                    123456789
                  </label>
                  <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                </div>
              </div>

              <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                <div className="mt-md-4">
                  <Form.Check
                    className="pl-4"
                    inline
                    type="radio"
                    id={`inline--4`}
                  />
                  <label className="pt-2 mb-0" htmlFor={`inline--4`}>
                    123456789
                  </label>
                  <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                </div>
              </div>

              {/* <div className="col-md-4 col-xs-12 col-bl col-bb col-text-info">3 of 4</div> */}
              {/* <div className="col-md-4 col-xs-12 col-last">4 of 4</div> */}
            </div>
          </div>
        </section>
        <section className="row row-two bg-white" aria-labelledby="insContact">
          <div id="insContact" className="col-md-3 col-xs-12 col-first">
            פרטי יצירת קשר עם המבוטח
          </div>
          <div className="col-md-9 col-xs-12 align-self-center col-last">
            <div className="form-row col-text-info">
              <div className="form-group col-md-4">
                <label htmlFor="mobile">מספר טלפון נייד</label>
                <label className="mr-2 text-danger">*</label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  aria-required="true"
                />
              </div>
              <div className="form-group col-md-7">
                <label htmlFor="email">כתובת דואר אלקטרוני</label>
                <label className="mr-2 text-danger">*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-required="true"
                />
              </div>
              <div className="col-md-1 d-xs-none"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default InsDetails;
