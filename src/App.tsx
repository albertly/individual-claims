import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { ContextInsProvider } from './shared/contextData';
import Main from './Main';
import Second from './Second';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App(): React.ReactElement {
  let history = useHistory();

  function handleClick() {
    switch (window.location.pathname) {
      case '/':
        history.push('/second');
        break;
      case '/second':
        history.push('/second/treatdetails');
        break;
    }
  }

  return (
    <ContextInsProvider>
      <header style={{ backgroundColor: '#CFE4FE' }}>
        <div style={{ backgroundColor: '#003F80' }}>
          <svg
            className="mx-1 my-1"
            focusable="false"
            viewBox="0 0 87 32"
            aria-hidden="true"
            role="presentation"
            data-hrl-bo="atm-harelLogo"
            width="87"
            height="32"
          >
            <path
              fill="#0088C9"
              d="M75.827 4.187c3.653 2.686 2.867 7.258-.008 10.048-.245-1.952-1.338-3.173-2.62-3.931-2.59-1.533-7.923-1.361-11.891 2.83-.93.982-1.692 2.534-2.266 3.618-1.561-3.53-.424-7.395 2.84-10.841 4.178-4.414 10.12-4.536 13.945-1.724"
            ></path>
            <path
              fill="#F7B207"
              d="M62.353 15.152c.535-4.458 4.95-6.074 8.84-5.017-1.594 1.185-2.12 2.729-2.147 4.2-.052 2.975 2.765 7.437 8.435 8.726 1.33.303 3.075.176 4.315.123-2.324 3.097-6.292 4.06-10.954 3-5.971-1.358-9.05-6.364-8.489-11.032"
            ></path>
            <path
              fill="#2D9D3A"
              d="M78.893 20.767c-4.189 1.773-9.824-1.987-9.406-6.481 1.206 1.54 3.548 2.188 5.34 1.181 2.625-1.474 5.158-6.076 3.457-11.556-.399-1.284-1.384-2.71-2.05-3.741 3.886.434 6.717 3.336 8.116 7.842 1.792 5.77-1.071 10.898-5.457 12.755"
            ></path>
            <g transform="translate(0 10.178)">
              <path
                fill="#FFFFFF"
                d="M0 .106V8.03h6.953L2.625 20.56h4.821l4.428-12.59V4.86H4.789V.106z"
              ></path>
            </g>
            <g transform="translate(13.116 14.936)">
              <path
                fill="#FFFFFF"
                d="M15.81 15.803s-2.788-4.516-4.33-6.639c1.805-.568 3.773-1.674 3.806-4.695V.102h-4.888v6.072c0 .867-.36.747-.36.747L5.905.103H.033l4.428 5.652C2.591 6.652.723 7.4.723 11.557v4.247l4.887-.001V8.746c0-.808.525-.748.525-.748l4.296 7.805h5.38z"
              ></path>
            </g>
            <path
              fill="#FFFFFF"
              d="M40.373 30.739V19.973c0-3.858-1.541-4.935-5.182-4.935h-5.085v3.17h3.314c1.705-.03 2.033.509 2.033 2.034v10.497h4.92zM56.638 30.739V19.973c0-3.858-1.575-4.935-5.216-4.935h-7.938v3.17h6.2c1.673 0 2.034.539 2.034 2.064v10.467h4.92zm-8.332-9.42l-4.821 1.016v8.404h4.821v-9.42z"
            ></path>
          </svg>
        </div>
        <div style={{ height: '2rem', backgroundColor: '#CFE4FE' }}></div>
        <div
          className="text-right align-middle d-flex"
          style={{
            marginRight: '0.2rem',
            marginLeft: '0.2rem',
            height: '4rem',
            backgroundColor: '#003F80',
            color: 'white',
          }}
        >
          <h1
            // className="display-4" 
            style={{
              // marginTop: 'auto',
              // marginBottom: 'auto',
              paddingRight: '1.5rem',
              alignSelf: 'center'
            }}
          >
            הגשת תביעה לביטוח שיניים
          </h1>
        </div>
        <div style={{ height: '1rem', backgroundColor: '#CFE4FE' }}></div>
        <aside
          className="align-top text-right"
          style={{
            height: '2rem',
            marginRight: '0.2rem',
            backgroundColor: 'white',
          }}
        >
          <span
            className="mr-2 align-top text-right"
            style={{ fontSize: '1rem', fontWeight: 500, textAlign: 'right' }}
          >
            שדות בטופס המסומנים בכוכבית הינם שדות חובה
          </span>
          <span
            className="mr-2 text-danger align-top text-right"
            style={{ fontSize: '1rem', fontWeight: 900, textAlign: 'right' }}
          >
            *
          </span>
        </aside>
        <div style={{ height: '1rem', backgroundColor: '#CFE4FE' }}></div>
      </header>

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/second" component={Second} />
      </Switch>

      <footer>
        <Button variant="primary" onClick={handleClick}>
          המשך
        </Button>
      </footer>
    </ContextInsProvider>
  );
}

export default App;
