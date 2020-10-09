import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { DataContext, InsType as Inputs, Types } from './shared/contextData';
import { AppContext, Types as AppTypes, Direction } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function InsDetails(): React.ReactElement {
  let history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);

  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    defaultValues: { ...state.insured },
  });

  const onSubmit = (data: Inputs) => {
    dispatch({ type: Types.SetIns, payload: { ...data } }); //ToDo: Submit
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.TREATMENT],
        direction: Direction.Forward,
      },
    });
    setTimeout(() => history.push(Paths.TREATMENT), 0);
  };

  function handleClick() {
    handleSubmit(onSubmit)();
  }

  function handleBackClick() {
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.INSURED],
        direction: Direction.Back,
      },
    });
    setTimeout(() => history.push(Paths.INSURED), 0);    
  }

  return (
    <div>
      <main aria-labelledby="h2_insDetails">
        <h2 id="h2_insDetails" className="hidden">
          פרטי המבוטח
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="row" aria-labelledby="insFamily">
            <h3 id="insFamily" className="col-md-3 col-xs-12 col-first">
              פרטי המבוטח לגביו מוגשת התביעה
            </h3>

            <div className="col-md-9 col-xs-12">
              <div className="row">
                <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                  <div className="mt-md-4">
                    <Form.Check
                      name="insured"
                      className="pl-4"
                      inline
                      type="radio"
                      id={`inline--1`}
                      ref={register({
                        required: 'נא לבחור מבוטח',
                      })}
                      value="123456789"
                    />
                    <label className="pt-2 mb-0" htmlFor={`inline--1`}>
                      123456789
                    </label>
                    <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                    {errors.insured && (
                      <div className="invalid-tooltip" role="alert">
                        {errors.insured.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                  <div className="mt-md-4">
                    <Form.Check
                      name="insured"
                      className="pl-4"
                      inline
                      type="radio"
                      id={`inline--2`}
                      ref={register}
                      value="123456788"
                    />
                    <label className="pt-2 mb-0" htmlFor={`inline--2`}>
                      123456788
                    </label>
                    <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                  </div>
                </div>

                <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                  <div className="mt-md-4">
                    <Form.Check
                      name="insured"
                      className="pl-4"
                      inline
                      type="radio"
                      id={`inline--3`}
                      ref={register}
                      value="123456787"
                    />
                    <label className="pt-2 mb-0" htmlFor={`inline--3`}>
                      123456787
                    </label>
                    <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                  </div>
                </div>

                <div className="col-md-4 pb-md-4 col-xs-12 col-bl col-bb col-text-info">
                  <div className="mt-md-4">
                    <Form.Check
                      name="insured"
                      className="pl-4"
                      inline
                      type="radio"
                      id={`inline--4`}
                      ref={register}
                      value="123456786"
                    />
                    <label className="pt-2 mb-0" htmlFor={`inline--4`}>
                      123456786
                    </label>
                    <div style={{ paddingRight: '3.4rem' }}>מיכאל אברג'יל</div>
                  </div>
                </div>

                {/* <div className="col-md-4 col-xs-12 col-bl col-bb col-text-info">3 of 4</div> */}
                {/* <div className="col-md-4 col-xs-12 col-last">4 of 4</div> */}
              </div>
            </div>
          </section>
          <section className="row bg-white" aria-labelledby="insContact">
            <h3 id="insContact" className="col-md-3 col-xs-12 col-first">
              פרטי יצירת קשר עם המבוטח
            </h3>
            <div className="col-md-9 col-xs-12 align-self-center col-last">
              <div className="form-row col-text-info">
                <div className="form-group col-md-4">
                  <label htmlFor="mobile">מספר טלפון נייד</label>
                  <label className="mr-2 text-danger">*</label>
                  <input
                    name="mobile"
                    type="tel"
                    className="form-control"
                    id="mobile"
                    aria-required="true"
                    required
                    ref={register({
                      required: 'שדה חובה',
                    })}
                  />
                  {errors.mobile && (
                    <div className="invalid-tooltip">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
                <div className="form-group col-md-7">
                  <label htmlFor="email">כתובת דואר אלקטרוני</label>
                  <label className="mr-2 text-danger">*</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    aria-required="true"
                    required
                    ref={register({
                      required: 'שדה חובה',
                      pattern: {
                        value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        message: 'דואר לא חוקי',
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-tooltip" role="alert">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="col-md-1 d-xs-none"></div>
              </div>
            </div>
          </section>
        </form>
      </main>
      <footer>
        <nav>
          <Button variant="primary" onClick={handleClick}>
            המשך
          </Button>
        </nav>
      </footer>
    </div>
  );
}
export default InsDetails;
