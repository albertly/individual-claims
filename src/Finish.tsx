import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import { AppContext, Types as AppTypes, Direction } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function Finish(): React.ReactElement {
  let history = useHistory();
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);

  useEffect(() => {
    if (stateApp.navigation.sm[Pages[Paths.PAYMENT]]) {
      dispatchApp({
        type: AppTypes.SetNumber,
        payload: {
          page: Pages[Paths.FINISH],         
        },
      });      
    }
    else {
      history.push(Paths.MAIN);
    }
  }, []);



  const onSubmit = (/*data: Inputs*/) => {
    // dispatch({ type: Types.AddDoc, payload: { ...data } }); //ToDo: Submit
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.MAIN],
        //direction: Direction.Forward,
      },
    });
    setTimeout(() => history.push(Paths.MAIN), 0);
  };

  function handleClick() {
    // handleSubmit(onSubmit)(); //ToDo
    onSubmit();
  }

  return (
    <div>
      <main aria-labelledby="h2_finish">
        <h2 id="h2_finish" className="hidden">
          סיום
        </h2>
        <section className="row min-vh-50" aria-labelledby="finishBefore">
          <h3
            id="finishBefore"
            className="col-md-3 col-xs-12 col-first d-flex justify-content-center align-items-center bg-success"
          >
            <FontAwesomeIcon
              className="ml-2"
              icon={faCheckCircle}
              color="white"
              size="4x"
            />
          </h3>
          <div className="col-md-9 col-xs-12 col-last col-text-help d-flex flex-column align-items-start justify-content-center">
            <p className="text-success h2 mb-md-5 mb-xs-1">
              תביעתך נקלטה בהצלחה
            </p>
            <p className="text-secondary">
              בדקות הקרובות ישלח אליך אישור על קליטת התביעה לכתובת הדואר
              האלקטרוני ולטלפון הנייד שהזתת. מענה מטעם הראל יתקבל תוך עד 14 ימי
              עבודה.
            </p>

            <a
              className="mt-md-4 mt-xs-1 link-icon-color h5"
              href="#"
              onClick={handleClick}
            >
              להגשת תביעת עבור חשבונית נוסופות
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
export default Finish;
