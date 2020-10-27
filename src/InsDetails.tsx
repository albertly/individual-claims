import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';

import { DataContext, InsType as Inputs, Types } from './shared/contextData';
import { AppContext, Types as AppTypes, Direction } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function Checkbox(
  name: string,
  register: any,
  errors: any
): (
  value: string,
  text: string,
  counter: number,
  showErrorOnce?: boolean
) => React.ReactElement {
  return (value, text, counter, showErrorOnce): React.ReactElement => {
    return (
      <li>
        <input
          name={name}
          type="checkbox"
          id={`${name}--${counter}`}
          ref={register({
            required: 'נא לבחור מבוטח',
          })}
          value={value}
          aria-required="true"
          required
        />
        <label htmlFor={`${name}--${counter}`}>
          {value}
          <br />
          מיכל אברג'יל
          {showErrorOnce && errors[name] && (
            <div className="invalid-tooltip" role="alert">
              {errors[name].message}
            </div>
          )}
        </label>
      </li>
    );
  };
}

function InsDetails(): React.ReactElement {
  let history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);

  useEffect(() => {
    dispatchApp({
      type: AppTypes.SetNumber,
      payload: {
        page: Pages[Paths.INSURED],
      },
    });
  }, []);

  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    defaultValues: { ...state.insured },
  });

  const onSubmit = (data: Inputs) => {
    dispatch({ type: Types.SetIns, payload: { ...data } }); //ToDo: Submit
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.TREATMENT],
        // direction: Direction.Forward,
      },
    });
    setTimeout(() => history.push(Paths.TREATMENT), 0);
  };

  function handleClick() {
    handleSubmit(onSubmit)();
  }

  const buildCheckbox = Checkbox('insured', register, errors);

  return (
    <>
      <form action="none" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="hsg-g">
          <div className="hsg-c-12">
            <div className="hsg-strip">
              <div className="hsg-strip-side">
                <h3 className="hsg-strip-title">
                  פרטי המבוטח לגביו מוגשת התביעה
                </h3>
              </div>
              <div className="hsg-strip-content">
                <div className="hsg-strip-body hsg-padding-remove">
                  <ul className="hsg-checks">
                    {buildCheckbox('123456789', '', 1, true)}
                    {buildCheckbox('123456788', '', 2)}
                    {buildCheckbox('123456788', '', 3)}
                    {buildCheckbox('123456787', '', 4)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="hsg-strip">
              <div className="hsg-strip-side">
                <h3 className="hsg-strip-title">פרטי יצירת קשר עם המבוטח</h3>
              </div>
              <div className="hsg-strip-content">
                <div className="hsg-strip-body">
                  <div className="hsg-g">
                    <div className="hsg-c-medium-6">
                      <label htmlFor="mobile">
                        טלפון נייד
                        <span className="hsg-form-asterix">*</span>
                      </label>
                      <input
                        type="text"
                        name="mobile"
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
                    <div className="hsg-c-medium-6">
                      <label htmlFor="email">
                        כתובת דואר אלקטרוני
                        <span className="hsg-form-asterix">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* ------------------------------------- Footer with navigation  -------------------------------- */}

      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-text-background-white hsg-text-left">
            <button
              className="hsg-button hsg-button-primary"
              onClick={handleClick}
            >
              המשך
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default InsDetails;
