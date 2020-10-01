import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { InsContext, ITreat as Inputs, Types } from './shared/contextData';

import Button from 'react-bootstrap/Button';

function TreadDetails(): React.ReactElement {
  let history = useHistory();
  const { state, dispatch } = useContext(InsContext);
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    defaultValues: { ...state.treatment },
  });

  const onSubmit = (data: Inputs) => {
    dispatch({ type: Types.SetIns, payload: { ...data } });
    console.log('data', data);
  };

  function handleClick() {
    history.push('/second');
  }

  return (
    <main aria-label="פרטי טיפול">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <section className="row" aria-labelledby="treatDetails">
          <h3 id="treatDetails" className="col-md-3 col-xs-12 col-first">
            פרטי הטיפול/ים
          </h3>
          <div className="col-md-9 col-xs-12 align-self-center col-last">
            <aside className="row">
              יש למלא את פרטי הטיפול/ים שעברת, בהתאם למופיע בחשבונית
            </aside>
            <div className="form-row col-text-info">
              <div className="form-group col-md-4">
                <label htmlFor="invoice">מספר חשבונית</label>
                <label className="mr-2 text-danger">*</label>
                <input
                  name="invoice"
                  type="text"
                  className="form-control"
                  id="invoice"
                  aria-required="true"
                  required
                  ref={register({
                    required: 'שדה חובה',
                  })}
                />
                {errors.invoice && (
                  <div className="invalid-tooltip">
                    {errors.invoice.message}
                  </div>
                )}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="doctorId">מספר רשיון הרופא/ה</label>
                <input
                  name="doctorId"
                  type="text"
                  className="form-control"
                  id="doctorId"
                  ref={register()}
                />
                {errors.doctorId && (
                  <div className="invalid-tooltip" role="alert">
                    {errors.doctorId.message}
                  </div>
                )}
              </div>
              <div className="col-md-4 d-xs-none"></div>
            </div>
          </div>
        </section>
      </form>
      <section className="row">
        <div className="col-3 col-first">1 of 2</div>
        <div className="col col-last">2 of 2</div>
      </section>
      {/* <Button variant="primary" onClick={handleClick}>המשך</Button> */}
    </main>
  );
}
export default TreadDetails;
