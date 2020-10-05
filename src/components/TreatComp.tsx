import React, { useState, useEffect } from 'react';
import { ArrayField, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Treatment } from '../services/Treatments';

import Button from 'react-bootstrap/Button';

type Props = {
  key?: string;
  treats: Treatment[];
  treatment: Partial<ArrayField<Record<string, any>, 'id'>>;
  index: number;
  register: any;
  control: any;
  setValue: any;
  getValues: any;
  remove: any;
  errors: any;
};

function Checkbox({
  ctlName,
  lblName,
  control,
}: {
  ctlName: string;
  lblName: string;
  control: any;
}): React.ReactElement {
  return (
    <>
      <Controller
        control={control}
        name={ctlName}
        render={({ onChange, onBlur, value, name }) => (
          <input
            className="form-check-input"
            onBlur={onBlur}
            type="checkbox"
            onChange={e => onChange(e.target.checked)}
            checked={value}
            name={name}
            id={name}
          />
        )}
      />

      <label className="form-check-label pr-4" htmlFor={ctlName}>
        {lblName}
      </label>
    </>
  );
}

const msgAnother = `כדי להגיש את התביעה נדרש טופס פירוט ההליך הרפואי כפי שמולא על ידי מרפאת השיניים.
אם לא קיבלת את הטופס,  ניתן להסיר את הטיפול מרשימת הטיפולים כעת ולהגיש תביעה לגבי
טיפול זה במועד מאוחר יותר.
`;

function TreatComp({
  key,
  treats,
  treatment,
  index,
  register,
  control,
  setValue,
  getValues,
  remove,
  errors,
}: Props): React.ReactElement {
  const lookupTreatKind = (kindId: number | string | undefined): number => {
    if (kindId) {
      //ToDo: not kindId but treatId
      kindId = +kindId;
    } else {
      kindId = 0;
    }

    const t = treats.find(t => t.id === kindId);

    return t ? t.kind : 0;
  };

  const [kind, setKind] = useState(0);

  useEffect(() => {
    setKind(lookupTreatKind(treatment.treatId));
  }, [treats]);

  return (
    <>
      <section key={key} className="row">
        <div className="col col-last">
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor={`treatments[${index}].treatId`}>סוג טיפול</label>
              <label className="mr-2 text-danger">*</label>

              <Controller
                control={control}
                name={`treatments[${index}].treatId`}
                rules={{
                  validate: () => {
                    console.log('getValues', getValues().treatments[index]);
                    console.log('errors', errors);
                    return (
                      !!getValues().treatments[index].treatId ||
                      'חובה לבחור סוג טיפול'
                    );
                  },
                }}
                render={({ onChange, onBlur, value, name }) => (
                  <select
                    className="form-control"
                    id={name}
                    name={name}
                    // onChange={handleTreatChange}
                    //value={treatment.treatId}
                    onChange={e => {
                      setKind(lookupTreatKind(+e.target.value));
                      return onChange(e.target.value);
                    }}
                    value={value}
                  >
                    <option key={0} value={0}>
                      בחירה
                    </option>
                    {treats.map(e => (
                      <option key={e.id} value={e.id}>
                        {e.item}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.treatments && errors.treatments[index].treatId && (
                <div className="invalid-tooltip" role="alert">
                  {errors.treatments[index].treatId.message}
                </div>
              )}
            </div>

            {kind !== 4 && (
              <>
                <div className="form-group col-md-3">
                  <label htmlFor={`treatments[${index}].treatDate`}>
                    תאריך הטיפול
                  </label>
                  <label className="mr-2 text-danger">*</label>

                  <input
                    name={`treatments[${index}].treatDate`}
                    type="date"
                    className="form-control"
                    id={`treatments[${index}].treatDate`}
                    defaultValue={`${treatment.treatDate}`}
                    aria-required="true"
                    required
                    ref={register({
                      required: 'שדה חובה',
                    })}
                  />

                  {errors.treatments && errors.treatments[index].treatDate && (
                    <div className="invalid-tooltip" role="alert">
                      {errors.treatments[index].treatDate.message}
                    </div>
                  )}
                </div>

                <div className="col-md-3">
                  <label htmlFor={`treatments[${index}].cost`}>
                    עלות הטיפול
                  </label>
                  <label className="mr-2 text-danger">*</label>
                  <div className="input-group">
                    <input
                      name={`treatments[${index}].cost`}
                      type="text"
                      className="form-control"
                      id={`treatments[${index}].cost`}
                      defaultValue={`${treatment.cost}`}
                      aria-required="true"
                      required
                      ref={register()}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">&#8362;</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {kind === 4 && (
              <div className="col-md-6 d-flex justify-content-start">
                <FontAwesomeIcon
                  className="icon-font-size va-m ml-2 link-icon-color d-inline"
                  icon={faExclamationCircle}
                />
                <p className="d-inline11">{msgAnother}</p>
              </div>
            )}

            <div className="col-md-2 d-xs-none">
              <Button
                className="bg-transparent border-0 btn-sm"
                onClick={() => remove(index)}
              >
                <FontAwesomeIcon icon={faTrashAlt} size="sm" color="#006CB2" />
                <small className="link-icon-color pr-1">הסרת טיפול</small>
              </Button>
            </div>
          </div>

          <div className="form-row">
            {kind >= 2 && kind !== 4 && (
              <div className="form-group col-md-1">
                <label htmlFor={`treatments[${index}].tooth`}>מספר שן</label>
                <label className="mr-2 text-danger">*</label>

                <input
                  type="number"
                  className="form-control"
                  id={`treatments[${index}].tooth`}
                  name={`treatments[${index}].tooth`}
                  defaultValue={`${treatment.tooth}`}
                  ref={register()}
                />
              </div>
            )}

            {kind >= 3 && kind !== 4 && (
              <div className="form-group col-md-3">
                <div className="row">
                  <label htmlFor="surface">משטח</label>
                  <label className="mr-2 text-danger">*</label>
                </div>
                <div className="row">
                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].CL_V`}
                      lblName="CL_V"
                      control={control}
                    />
                  </div>
                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].L_P`}
                      lblName="L_P"
                      control={control}
                    />
                  </div>
                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].B`}
                      lblName="B"
                      control={control}
                    />
                  </div>
                  <div className="col-md-3 d-xs-none"></div>
                </div>
                <div className="row mt-md-4">
                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].D`}
                      lblName="D"
                      control={control}
                    />
                  </div>

                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].M`}
                      lblName="M"
                      control={control}
                    />
                  </div>

                  <div className="form-check col-md-3">
                    <Checkbox
                      ctlName={`treatments[${index}].O`}
                      lblName="O"
                      control={control}
                    />
                  </div>
                  <div className="col-md-3 d-xs-none"></div>
                </div>
              </div>
            )}

            {kind >= 1 && kind !== 4 && (
              <div className="form-group col-md-4">
                <label
                  className="d-block"
                  htmlFor={`treatments[${index}].notes`}
                >
                  הערות רפואיות נוספות
                </label>
                <textarea
                  className="form-control"
                  id={`treatments[${index}].notes`}
                  name={`treatments[${index}].notes`}
                  rows={5}
                  cols={60}
                  ref={register()}
                >
                  {treatment.notes}
                </textarea>
              </div>
            )}

            <div className="col-md-8 d-xs-none"></div>
          </div>
        </div>
      </section>
    </>
  );
}
export default TreatComp;
