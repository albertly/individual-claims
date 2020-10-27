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
            onBlur={onBlur}
            type="checkbox"
            onChange={e => onChange(e.target.checked)}
            checked={value}
            name={name}
            id={name}
          />
        )}
      />

      <label htmlFor={ctlName}>{lblName}</label>
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
      <div key={key} className="hsg-panel hsg-panel-light">
        <div className="hsg-g">
          <div className="hsg-c-medium-4">
            <label htmlFor={`treatments[${index}].treatId`}>
              סוג טיפול <span className="hsg-form-asterix">*</span>
            </label>

            <Controller
              control={control}
              name={`treatments[${index}].treatId`}
              rules={{
                validate: () => {
                  return (
                    (getValues().treatments[index].treatId &&
                      getValues().treatments[index].treatId != 0) ||
                    'חובה לבחור סוג טיפול'
                  );
                },
              }}
              render={({ onChange, onBlur, value, name }) => (
                <select
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
              <div className="hsg-c-medium-4">
                <label
                  className="primary-font"
                  htmlFor={`treatments[${index}].treatDate`}
                >
                  תאריך הטיפול
                  <span className="hsg-form-asterix">*</span>
                </label>

                <input
                  name={`treatments[${index}].treatDate`}
                  type="date"
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

              <div className="hsg-c-medium-4">
                <label htmlFor={`treatments[${index}].cost`}>
                  עלות הטיפול
                  <span className="hsg-form-asterix">*</span>
                </label>

                <input
                  name={`treatments[${index}].cost`}
                  type="text"
                  id={`treatments[${index}].cost`}
                  defaultValue={`${treatment.cost}`}
                  aria-required="true"
                  required
                  ref={register()}
                />
              </div>
            </>
          )}
          {kind === 4 && (
            <div className="hsg-c-medium-8">
              <p style={{ paddingTop: '30px' }}>
                <i className="hsg-icon-exclamation"></i> כדי להגיש את התביעה
                נדרש טופס פירוט ההליך הרפואי כפי שמולא על ידי מרפאת השיניים אם
                לא קיבלת את הטופס, ניתן להסיר את הטיפול מרשימת הטיפולים כעת
                ולהגיש תביעה לגבי .טיפול זה במועד מאוחר יותר{' '}
              </p>
            </div>
          )}

          <div className="hsg-c-12">
            <a href="#" onClick={() => remove(index)}>
              הסרת טיפול
            </a>
          </div>
        </div>

        <div className="hsg-g">
          {kind === 2 && (
            <>
              <div className="hsg-c-medium-2">
                <label htmlFor={`treatments[${index}].tooth`}>
                  מספר שן
                  <span className="hsg-form-asterix">*</span>
                </label>
                <input
                  type="text"
                  name={`treatments[${index}].tooth`}
                  id={`treatments[${index}].tooth`}
                  defaultValue={`${treatment.tooth}`}
                  ref={register()}
                />
              </div>

              <div className="hsg-c-medium-10">
                <label htmlFor={`treatments[${index}].notes`}>
                  הערות רפואיות נוספות
                </label>
                <textarea
                  name={`treatments[${index}].notes`}
                  id={`treatments[${index}].notes`}
                  ref={register()}
                >
                  {treatment.notes}
                </textarea>
              </div>
            </>
          )}

          {kind === 3 && (
            <>
              <div className="hsg-c-medium-6">
                <div className="hsg-g">
                  <div className="hsg-c-medium-3">
                    <label htmlFor={`treatments[${index}].tooth`}>
                      מספר שן
                      <span className="hsg-form-asterix">*</span>
                    </label>
                    <input
                      type="text"
                      name={`treatments[${index}].tooth`}
                      id={`treatments[${index}].tooth`}
                      defaultValue={`${treatment.tooth}`}
                      ref={register()}
                    />
                  </div>

                  <div className="hsg-c-medium-9">
                    <label htmlFor="a3">
                      משטח
                      <span className="hsg-form-asterix">*</span>
                    </label>

                    <div className="hsg-g">
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].CL_V`}
                            lblName="CL_V"
                            control={control}
                          />
                        </span>
                      </div>
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].L_P`}
                            lblName="L_P"
                            control={control}
                          />
                        </span>
                      </div>
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].B`}
                            lblName="B"
                            control={control}
                          />
                        </span>
                      </div>
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].D`}
                            lblName="D"
                            control={control}
                          />
                        </span>
                      </div>
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].M`}
                            lblName="M"
                            control={control}
                          />
                        </span>
                      </div>
                      <div className="hsg-c-medium-4">
                        <span className="hsg-custom-input">
                          <Checkbox
                            ctlName={`treatments[${index}].O`}
                            lblName="O"
                            control={control}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hsg-c-medium-6">
                <label htmlFor={`treatments[${index}].notes`}>
                  הערות רפואיות נוספות
                </label>
                <textarea
                  name={`treatments[${index}].notes`}
                  id={`treatments[${index}].notes`}
                  ref={register()}
                >
                  {treatment.notes}
                </textarea>
              </div>
            </>
          )}

          {kind === 1 && (
            <div className="hsg-c-medium-12">
              <label htmlFor={`treatments[${index}].notes`}>
                הערות רפואיות נוספות
              </label>
              <textarea
                name={`treatments[${index}].notes`}
                id={`treatments[${index}].notes`}
                ref={register()}
              >
                {treatment.notes}
              </textarea>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TreatComp;
