import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';

import {
  DataContext,
  TreatType as Inputs,
  TreatDetail,
  Types,
} from './shared/contextData';
import { getTreatments, Treatment } from './services/Treatments';
import TreatComp from './components/TreatComp';

function TreadDetails(): React.ReactElement {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [kind, setKind] = useState(0);

  useEffect(() => {
    setTreatments(getTreatments());
    const values = getValues();
    if (
      !values.treatments ||
      (values.treatments && values.treatments.length === 0)
    ) {
      append({ ...treatDetailsDefaults });
    }
  }, []);

  let history = useHistory();
  const { state, dispatch } = useContext(DataContext);

  const {
    register,
    getValues,
    setValue,
    control,
    handleSubmit,
    watch,
    errors,
  } = useForm<Inputs>({
    defaultValues: {
      invoice: state.treatment.invoice,
      doctorId: state.treatment.doctorId,
      treatments: [...state.treatment.treatments],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'treatments',
    }
  );

  const treatDetailsDefaults: TreatDetail = {
    treatId: 0,
    treatDate: new Date(),
    cost: 0,
    notes: '',
    tooth: 0,
    CL_V: false,
    L_P: false,
    B: false,
    D: false,
    M: false,
    O: false,
  };

  const onSubmit = (data: Inputs) => {
    console.log('data', JSON.stringify(data));
    dispatch({ type: Types.SetTreat, payload: data });
    history.push('/second/docs');
  };

  function handleClick() {
    handleSubmit(onSubmit)();
  }

  function handleBackClick() {
    history.push('/second');
  }

  return (
    <div>
      <main aria-labelledby="h2_treatDetails">
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
                    ref={register}
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

        {fields.map((item, index) => {
          return (
            <TreatComp
              key={item.id}
              treats={treatments}
              treatment={item}
              index={index}
              register={register}
              control={control}
              setValue={setValue}
              getValues={getValues}
              remove={remove}
              errors={errors}
            />
          );
        })}

        <div className="row">
          <div className="col">
            <Button
              className="bg-transparent border-0 btn-sm"
              onClick={() => {
                append({ ...treatDetailsDefaults });
              }}
            >
              <FontAwesomeIcon
                className="link-icon-color"
                icon={faPlusSquare}
                size="sm"
              />
              <small className="link-icon-color pr-1">הוספת טיפול</small>
            </Button>
          </div>
        </div>
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
            המשך
          </Button>
        </nav>
      </footer>
    </div>
  );
}
export default TreadDetails;
