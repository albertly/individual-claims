import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';

import { DataContext, TreatType as Inputs, Types } from './shared/contextData';
import { getTreatments, Treatment } from './services/Treatments';
import TreatComp from './components/TreatComp';

function TreadDetails(): React.ReactElement {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [kind, setKind] = useState(0);

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

  function handleTreatChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const t = treatments.find(t => t.id === +e.target.value);

    t ? setKind(t.kind) : setKind(0);

    console.log(e.target.value);
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
                <select
                  className="form-control"
                  id="treatKind"
                  onChange={handleTreatChange}
                >
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

              <div className="col-md-3">
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
              <div className="col-md-2 d-xs-none">
                <Button className="bg-transparent border-0 btn-sm">
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="sm"
                    color="#006CB2"
                  />
                  <small className="text-primary pr-1">הסרת טיפול</small>
                </Button>
              </div>
            </div>

            <div className="form-row">
              {kind >= 2 && (
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
              )}

              {kind >= 3 && (
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
                  <div className="row mt-md-4">
                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox4"
                        value="option4"
                      />
                      <label
                        className="form-check-label pr-4"
                        htmlFor="inlineCheckbox4"
                      >
                        D
                      </label>
                    </div>

                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox5"
                        value="option5"
                      />
                      <label
                        className="form-check-label pr-4"
                        htmlFor="inlineCheckbox5"
                      >
                        M
                      </label>
                    </div>

                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inlineCheckbox6"
                        value="option6"
                      />
                      <label
                        className="form-check-label pr-4"
                        htmlFor="inlineCheckbox6"
                      >
                        O
                      </label>
                    </div>
                    <div className="col-md-3 d-xs-none"></div>
                  </div>
                </div>
              )}

              {kind >= 1 && (
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
              )}
              <div className="col-md-8 d-xs-none"></div>
            </div>
          </div>
        </section>

        <TreatComp treatments={treatments} treatment={state.treatment} />
        
        <div className="row">
          <div className="col">
            <Button className="bg-transparent border-0 btn-sm">
              <FontAwesomeIcon icon={faPlusSquare} size="sm" color="#006CB2" />
              <small className="text-primary pr-1">הוספת טיפול</small>
            </Button>
          </div>
        </div>
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
