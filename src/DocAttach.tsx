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
    <div>
      <main aria-labelledby="h2_p1">
        <h2 id="h2_p1" className="hidden">
          צירוף מסמכים
        </h2>
        <section className="row" aria-labelledby="mainBefore">
          <h3 id="mainBefore" className="col-md-3 col-xs-12 col-first">
            מסמכים נדרשים לתביעה
          </h3>

          <div className="col-md-7 col-xs-12 col-last col-text-help">
            <div className="row">
              <p className="col-12 text-right">
                לטיפול מהיר ויעיל בבקשתך, נבקש להפקיד להלות כל המסמכים הנדרשים
              </p>
            </div>

            {/* File 1 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 radio-border text-right">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="invoice">חשבונית עבור הטיפול</label>
                <label className="mr-2 text-danger">*</label>
              </div>

              <div className="col-md-5 col-xs-12 radio-border text-right">
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
                        console.log('file', e);
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

              <div className="col-md-2 d-xs-none" />
            </div>

            {/* File 2 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 text-right radio-border">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="medical">טופס פירוט ההליך הרפואי</label>
                <label className="mr-2 text-danger">*</label>
              </div>

              <div className="col-md-5 col-xs-12 text-right radio-border">
                <FileUpload
                  id="medical"
                  handleFile={(e: any) => {
                    console.log('file', e);
                  }}
                />
              </div>
              <div className="col-md-2 d-xs-none" />
            </div>

            {/* File 3 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 text-right radio-border">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="miscellaneous">
                  צילומים, מסמכים או אישורים נוספים
                </label>
              </div>

              <div className="col-md-5 col-xs-12 text-right radio-border">
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

              <div className="col-md-2 d-xs-none" />
            </div>
          </div>

          <div className="col-md-2 d-xs-none"></div>
        </section>
      </main>
      <footer>
        <nav>
          <GoBack handleBackClick={handleBackClick} />

          <button
            className="btn btn-primary"
            type="button"
            onClick={handleClick}
          >
            המשך
          </button>
        </nav>
      </footer>
    </div>
  );
}
export default DocAttach;
