import React, { useState, useContext, useEffect } from 'react';
import { ArrayField, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { DataContext, TreatType as Inputs, Types } from '../shared/contextData';
import { getTreatments, Treatment } from '../services/Treatments';

import Button from 'react-bootstrap/Button';
import { debug } from 'console';

type Props = {
  treatment: Partial<ArrayField<Record<string, any>, 'id'>>;
  index: number;
  register: any;
  control: any;
  setValue: any;
};
function TreatComp({
  treatment,
  index,
  register,
  control,
  setValue,
}: Props): React.ReactElement {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  const lookupTreatKind = (kindId: number | string | undefined): number => {
    if (kindId) {
      kindId = +kindId;
    } else {
      kindId = 0;
    }

    const t = treatments.find(t => t.id === kindId);

    return t ? t.kind : 0;
  };

  const [kind, setKind] = useState(0);

  useEffect(() => {
    console.log('treatment.id', treatment.id);

    setTreatments(getTreatments());
    setKind(lookupTreatKind(treatment.id));
    console.log('kind', kind);
  }, [treatments]);

  function handleTreatChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue('treatments', [{ id: e.target.value }]);
    setKind(lookupTreatKind(+e.target.value));
  }

  return (
    <>
      <section className="row">
        <div className="col col-last">
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor={`treatments[${index}].id`}>סוג טיפול</label>
              <label className="mr-2 text-danger">*</label>
              <select
                className="form-control"
                id={`treatments[${index}].id`}
                name={`treatments[${index}].id`}
                onChange={handleTreatChange}
                value={`${treatment.id}`}
                defaultValue={`${treatment.id}`}
                ref={register()}
              >
                <option key={0} value={0}>
                  בחירה
                </option>
                {treatments.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.item}
                  </option>
                ))}
              </select>
            </div>

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
                ref={register()}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor={`treatments[${index}].treatCost`}>
                עלות הטיפול
              </label>
              <label className="mr-2 text-danger">*</label>
              <div className="input-group">
                <input
                  name={`treatments[${index}].treatCost`}
                  type="text"
                  className="form-control"
                  id={`treatments[${index}].treatCost`}
                  defaultValue={`${treatment.treatCost}`}
                  aria-required="true"
                  required
                  ref={register()}
                />
                <div className="input-group-append">
                  <span className="input-group-text">&#8362;</span>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-xs-none">
              <Button className="bg-transparent border-0 btn-sm">
                <FontAwesomeIcon icon={faTrashAlt} size="sm" color="#006CB2" />
                <small className="text-primary pr-1">הסרת טיפול</small>
              </Button>
            </div>
          </div>

          <div className="form-row">
            {kind >= 2 && (
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
                      id={`treatments[${index}].CL_V`}
                      value={`${treatment.CL_V}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].CL_V`}
                    >
                      CL/V
                    </label>
                  </div>
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`treatments[${index}].L_P`}
                      value={`${treatment.L_P}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].L_P`}
                    >
                      L/P
                    </label>
                  </div>
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`treatments[${index}].B`}
                      value={`${treatment.B}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].B`}
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
                      id={`treatments[${index}].D`}
                      value={`${treatment.D}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].D`}
                    >
                      D
                    </label>
                  </div>

                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`treatments[${index}].M`}
                      value={`${treatment.M}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].M`}
                    >
                      M
                    </label>
                  </div>

                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`treatments[${index}].O`}
                      value={`${treatment.O}`}
                      ref={register()}
                    />
                    <label
                      className="form-check-label pr-4"
                      htmlFor={`treatments[${index}].O`}
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
                  {`treatments[${index}].notes`}
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
