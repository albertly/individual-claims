import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import GoBack from './components/GoBack';
import { AppContext, Types as AppTypes, Direction } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function Payment(): React.ReactElement {
  let history = useHistory();
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);

  const onSubmit = (/*data: Inputs*/) => {
    // dispatch({ type: Types.AddDoc, payload: { ...data } }); //ToDo: Submit
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.FINISH],
        direction: Direction.Forward,
      },
    });
    setTimeout(() => history.push(Paths.FINISH), 0);
  };

  function handleClick() {
    // handleSubmit(onSubmit)(); //ToDo
    onSubmit();
  }

  function handleBackClick() {
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.DOCS],
        direction: Direction.Back,
      },
    });
    setTimeout(() => history.push(Paths.DOCS), 0);
  }

  return (
    <div>
      <main aria-labelledby="h2_payment">
        <h2 id="h2_payment" className="hidden">
          תשלום
        </h2>
        <section className="row min-vh-50" aria-labelledby="paymentBefore">
          <h3 id="paymentBefore" className="col-md-3 col-xs-12 col-first">
            אמצעי להעברת תשלום
          </h3>
          <div className="col-md-9 col-xs-12 col-last">
            <p className="text-secondary h5 pt-2">
              תשלומי התביעה יועברו בהעברה בנקאית למשלם הפוליסה
            </p>
          </div>
        </section>
      </main>

      <footer className="d-flex justify-content-end align-items-center">
        <nav>
          <GoBack handleBackClick={handleBackClick} />
          <Button variant="primary" onClick={handleClick}>
            אישור והגשת תביעה
          </Button>
        </nav>
      </footer>
    </div>
  );
}
export default Payment;
