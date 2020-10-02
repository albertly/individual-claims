import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { DataContext, TreatType as Inputs, Types } from './shared/contextData';
import { getTreatments, Treatment } from './services/Treatments';

import Button from 'react-bootstrap/Button';

function TreadDetails(): React.ReactElement {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    setTreatments(getTreatments());
  }, []);

  let history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    defaultValues: { ...state.treatment },
  });

  const onSubmit = (data: Inputs) => {
    dispatch({ type: Types.SetTreat, payload: data });
  };

  function handleClick() {
    handleSubmit(onSubmit)().then(() => history.push('/second/docs'));
  }

  function handleBackClick() {
    history.push('/second');
  }
  return (
    <>
      <main aria-label="h2_treatDetails">
        <h2 id="h2_treatDetails" className="hidden">
          פרטי טיפול
        </h2>
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
          <div className="col col-last">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="treatKind">סוג טיפול</label>
                <label className="mr-2 text-danger">*</label>
                <select className="form-control" id="treatKind">
                  <option>בחירה</option>
                  {treatments.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="treatDate">תאריך הטיפול</label>
                <label className="mr-2 text-danger">*</label>
                <input
                  name="treatDate"
                  type="date"
                  className="form-control"
                  id="treatDate"
                  aria-required="true"
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="treatCost">עלות הטיפול</label>
                <label className="mr-2 text-danger">*</label>
                <div className="input-group">
                  <input
                    name="treatCost"
                    type="text"
                    className="form-control"
                    id="treatCost"
                    aria-required="true"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">&#8362;</span>
                  </div>
                </div>
              </div>
              <div className="col-md-2 d-xs-none"></div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="tooth">מספר שן</label>
                <label className="mr-2 text-danger">*</label>

                <input
                  type="number"
                  className="form-control"
                  id="tooth"
                  name="tooth"
                />
              </div>

              <div className="form-group col-md-3">
                <div className="row">
                  <label htmlFor="surface">משטח</label>
                  <label className="mr-2 text-danger">*</label>
                </div>
                <div className="row">
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor="inlineCheckbox1"
                    >
                      CL/V
                    </label>
                  </div>
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      value="option2"
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor="inlineCheckbox2"
                    >
                      L/P
                    </label>
                  </div>
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox3"
                      value="option3"
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor="inlineCheckbox3"
                    >
                      B
                    </label>
                  </div>
                  <div className="col-md-3 d-xs-none"></div>
                </div>
                <div className="row mt-4">
                  <div className="form-check col-md-4 form-check-inline mx-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox4"
                      value="option4"
                    />
                    <label
                      className="form-check-label mr-2"
                      htmlFor="inlineCheckbox4"
                    >
                      D
                    </label>
                  </div>

                  <div className="form-check col-md-4 form-check-inline mx-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox5"
                      value="option5"
                    />
                    <label
                      className="form-check-label mr-2"
                      htmlFor="inlineCheckbox5"
                    >
                      M
                    </label>
                  </div>

                  <div className="form-check col-md-4 form-check-inline mx-5">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox6"
                      value="option6"
                    />
                    <label
                      className="form-check-label mr-2"
                      htmlFor="inlineCheckbox6"
                    >
                      O
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-4">
                <label className="d-block" htmlFor="notes">
                  הערות רפואיות נוספות
                </label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  rows={5}
                  cols={60}
                ></textarea>
              </div>
              <div className="col-md-8 d-xs-none"></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="d-flex justify-content-end align-items-center">
        <nav>
          <a
            style={{ textDecoration: 'underline' }}
            href="#"
            onClick={handleBackClick}
          >
            חזרה אחורה
          </a>
          <span className="px-2">או</span>
          <Button variant="primary" onClick={handleClick}>
            המשך
          </Button>
        </nav>
      </footer>
    </>
  );
}
export default TreadDetails;
