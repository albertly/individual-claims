import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import FileUpload from './components/FileUploader';
import { ExclamationImg } from './shared/img';

import GoBack from './components/GoBack';
import { DataContext, DocsType as Inputs, Types } from './shared/contextData';
import { AppContext, Types as AppTypes, Direction } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function DocAttach(): React.ReactElement {
  let history = useHistory();
  const { state, dispatch } = useContext(DataContext);
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);
  const { register, control, getValues, handleSubmit, watch, errors } = useForm<
    Inputs
  >({
    defaultValues: { ...state.docs },
  });

  useEffect(() => {
    if (stateApp.navigation.sm[Pages[Paths.TREATMENT]]) {
      dispatchApp({
        type: AppTypes.SetNumber,
        payload: {
          page: Pages[Paths.DOCS],
        },
      });
    } else {
      history.push(Paths.MAIN);
    }
  }, []);

  const onSubmit = (data: Inputs) => {
    dispatch({ type: Types.AddDoc, payload: { ...data } });
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.PAYMENT],
        // direction: Direction.Forward,
      },
    });
    setTimeout(() => history.push(Paths.PAYMENT), 0);
  };

  function handleClick() {
    handleSubmit(onSubmit)();
  }

  function handleBackClick() {
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.TREATMENT],
        // direction: Direction.Back,
      },
    });
    setTimeout(() => history.push(Paths.TREATMENT), 0);
  }
  return (
    <>
      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-strip">
            <div className="hsg-strip-side">
              <h3 className="hsg-strip-title">מסמכים נדרשים לתביעה</h3>
            </div>
            <div className="hsg-strip-content">
              <div className="hsg-strip-head">
                <h3>
                  לטיפול מהיר ויעיל בבקשתך, נבקש להקפיד להעלות את כל המסמכים
                  הנדרשים
                </h3>
              </div>
              <div className="hsg-strip-body">
                <ul className="hsg-list hsg-list-bullet hsg-list-space">
                  <li>
                    <div className="hsg-g">
                      <div className="hsg-c-small-6">
                        חשבונית עבור הטיפול
                        <span className="hsg-form-asterix">*</span>
                      </div>
                      <div className="hsg-c-small-6">
                        <Controller
                          control={control}
                          name="invoice"
                          rules={{
                            validate: () => {
                              console.log('getValues', getValues().invoice);
                              console.log('errors', errors);
                              console.log(
                                '!!getValues().treatments[index].treatId',
                                getValues().invoice
                              );
                              return !!getValues().invoice || 'חובה לבחור קובץ';
                            },
                          }}
                          render={({ onChange, onBlur, value, name }) => (
                            <FileUpload
                              id={name}
                              handleFile={(e: any) => {
                                return onChange(e);
                              }}
                              value={value}
                            />
                          )}
                        />

                        {errors.invoice && (
                          <div className="invalid-tooltip" role="alert">
                            {errors.invoice.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="hsg-g">
                      <div className="hsg-c-small-6">
                        טופס פירוט ההליך הרפואי
                      </div>
                      <div className="hsg-c-small-6">
                        <FileUpload
                          id="medical"
                          handleFile={(e: any) => {
                            console.log('file', e);
                          }}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="hsg-g">
                      <div className="hsg-c-small-6">
                        צילומים, מסמכים או אישורים נוספים
                      </div>
                      <div className="hsg-c-small-6">
                        <FileUpload
                          id="miscellaneous"
                          handleFile={(f: any) => {
                            console.log('file', f);
                            console.log('file obj', JSON.stringify(f));
                            f.arrayBuffer().then((b: any) =>
                              console.log('file buffer', b)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-text-background-white hsg-text-left">
            <span className="hsg-margin-left">
              <a href="treatment.html">חזרה אחורה</a> או
            </span>
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
export default DocAttach;
