import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';


import Badge from 'react-bootstrap/Badge';

import Main from './Main';
import Second from './Second';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface IActive {
  [key: string]: boolean;
}

function App(): React.ReactElement {
  const [active, setActive] = useState<IActive>({ l1: true, l2: false, l3: false, l4: false });
  const handleClick: React.ReactEventHandler = (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const e: any = event.nativeEvent.target;
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    const prop: string = e.id;
    obj[prop] = true;

    const obj1: IActive = { ...obj, [prop]: true };

    setActive(obj1);

    console.log('click', e.id);
  };

  return (
    <BrowserRouter>
      <header style={{ backgroundColor: '#CFE4FE' }}>
        <div style={{ backgroundColor: '#003F80' }}>
          <svg className="mx-1 my-1" focusable="false" viewBox="0 0 87 32" aria-hidden="true" role="presentation" data-hrl-bo="atm-harelLogo" width="87" height="32"><path fill="#0088C9" d="M75.827 4.187c3.653 2.686 2.867 7.258-.008 10.048-.245-1.952-1.338-3.173-2.62-3.931-2.59-1.533-7.923-1.361-11.891 2.83-.93.982-1.692 2.534-2.266 3.618-1.561-3.53-.424-7.395 2.84-10.841 4.178-4.414 10.12-4.536 13.945-1.724"></path><path fill="#F7B207" d="M62.353 15.152c.535-4.458 4.95-6.074 8.84-5.017-1.594 1.185-2.12 2.729-2.147 4.2-.052 2.975 2.765 7.437 8.435 8.726 1.33.303 3.075.176 4.315.123-2.324 3.097-6.292 4.06-10.954 3-5.971-1.358-9.05-6.364-8.489-11.032"></path><path fill="#2D9D3A" d="M78.893 20.767c-4.189 1.773-9.824-1.987-9.406-6.481 1.206 1.54 3.548 2.188 5.34 1.181 2.625-1.474 5.158-6.076 3.457-11.556-.399-1.284-1.384-2.71-2.05-3.741 3.886.434 6.717 3.336 8.116 7.842 1.792 5.77-1.071 10.898-5.457 12.755"></path><g transform="translate(0 10.178)"><path fill="#FFFFFF" d="M0 .106V8.03h6.953L2.625 20.56h4.821l4.428-12.59V4.86H4.789V.106z"></path></g><g transform="translate(13.116 14.936)"><path fill="#FFFFFF" d="M15.81 15.803s-2.788-4.516-4.33-6.639c1.805-.568 3.773-1.674 3.806-4.695V.102h-4.888v6.072c0 .867-.36.747-.36.747L5.905.103H.033l4.428 5.652C2.591 6.652.723 7.4.723 11.557v4.247l4.887-.001V8.746c0-.808.525-.748.525-.748l4.296 7.805h5.38z"></path></g><path fill="#FFFFFF" d="M40.373 30.739V19.973c0-3.858-1.541-4.935-5.182-4.935h-5.085v3.17h3.314c1.705-.03 2.033.509 2.033 2.034v10.497h4.92zM56.638 30.739V19.973c0-3.858-1.575-4.935-5.216-4.935h-7.938v3.17h6.2c1.673 0 2.034.539 2.034 2.064v10.467h4.92zm-8.332-9.42l-4.821 1.016v8.404h4.821v-9.42z"></path></svg>
        </div>
        <div style={{ height: '2rem', backgroundColor: '#CFE4FE' }}></div>
        <div className='text-right align-middle' style={{ marginRight: '0.2rem', marginLeft: '0.2rem', height: '4rem', backgroundColor: '#003F80', color: 'white' }}>
          <h3 style={{ marginTop: 'auto', marginBottom: 'auto' }}>הגשת תביעה לביטוח שיניים</h3>
        </div>
        <div style={{ height: '1rem', backgroundColor: '#CFE4FE' }}></div>
        <div style={{ height: '2rem', backgroundColor: 'white' }}></div>
        <div style={{ height: '1rem', backgroundColor: '#CFE4FE' }}></div>
      </header>

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/second" component={Second} />
      </Switch>

      {/* <Breadcrumb style={{ marginRight: '0.2rem', marginLeft: '0.2rem' }}>
        <Breadcrumb.Item href="#s1" onClick={handleClick} active={active.l1}>
          <div id="l1" className={`s ${active.l1 || active.l2 || active.l3 || active.l4 ? 'breadcrumb-item-active' : ''}`}>
            <Badge pill variant="primary">1</Badge> פרטי מבוטח
          </div>
          {active.l1 &&
            <div className="arrow" />
          }
        </Breadcrumb.Item>

        <Breadcrumb.Item active={active.l2} href="#s1" onClick={handleClick}
        >
          <div id="l2" className={`s ${active.l2 || active.l3 || active.l4 ? 'breadcrumb-item-active' : ''}`}>
            <Badge pill variant="primary">2</Badge> פרטי טיפול
          </div>
          {active.l2 &&
            <div className="arrow" />
          }

        </Breadcrumb.Item>
        <Breadcrumb.Item href="#s3" active={active.l3} onClick={handleClick}>

          <div id="l3" className={`s ${active.l3 || active.l4 ? 'breadcrumb-item-active' : ''}`}>
            <Badge pill variant="primary">3</Badge>צירוף מסמכים
          </div>
          {active.l3 &&
            <div className="arrow" />
          }

        </Breadcrumb.Item>

        <Breadcrumb.Item href="#s3" active={active.l4} onClick={handleClick}>

          <div id="l4" className={`s ${active.l4 ? 'breadcrumb-item-active' : ''}`}>
            <Badge pill variant="primary">4</Badge>אמצעי להעברת תשלום
          </div>
          {active.l4 &&
            <div className="arrow" />
          }

        </Breadcrumb.Item>
      </Breadcrumb>  */}
    </BrowserRouter >
  );
}

export default App;
