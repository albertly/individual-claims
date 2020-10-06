import React, { useState, useEffect } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Badge from 'react-bootstrap/Badge';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBreadcrumb.css';

interface IActive {
  [key: string]: boolean;
}

function NavBreadcrumb(): React.ReactElement {
  const [active, setActive] = useState<IActive>({
    l1: false,
    l2: false,
    l3: false,
    l4: false,
  });

  useEffect(() => {
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    let prop = 'l1';
    switch (window.location.pathname) {
      case '/second':
        prop = 'l1';
        break;
      case '/second/treatdetails':
        prop = 'l2';
        break;
      case '/second/docs':
        prop = 'l3';
        break;
      case '/second/payment':
      case '/second/finish':
        prop = 'l4';
        break;
    }
    setActive({ ...obj, [prop]: true });
  }, [window.location.pathname]);

  let history = useHistory();

  const handleClick: React.ReactEventHandler = (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const e: any = event.currentTarget;
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    const prop: string = e.id;
    obj[prop] = true;

    const obj1: IActive = { ...obj, [prop]: true };

    //  setActive(obj1);

    switch (prop) {
      case 'l1':
        history.push('/second');
        break;
      case 'l2':
        history.push('/second/treatdetails');
        break;
      case 'l3':
        history.push('/second/docs');
        break;
      case 'l4':
        history.push('/second/payment');
        break;
    }
  };

  return (
    <Breadcrumb
      style={{ marginRight: '0.2rem', marginLeft: '0.2rem' }}
      aria-live="polite"
    >
      <Breadcrumb.Item
        id="l1"
        href="#s1"
        onClick={handleClick}
        active={active.l1}
      >
        <div
          className={`s ${
            active.l1 || active.l2 || active.l3 || active.l4
              ? 'breadcrumb-item-active'
              : ''
          }`}
        >
          <Badge pill variant="primary">
            1
          </Badge>
          <span className="d-none d-sm-inline">פרטי מבוטח</span>
          <span className="d-inline d-sm-none">מבוטח</span>
        </div>
        {active.l1 && <div className="arrow" />}
      </Breadcrumb.Item>

      <Breadcrumb.Item
        id="l2"
        active={active.l2}
        href="#s1"
        onClick={handleClick}
      >
        <div
          className={`s ${
            active.l2 || active.l3 || active.l4 ? 'breadcrumb-item-active' : ''
          }`}
        >
          <Badge pill variant="primary">
            2
          </Badge>
          <span className="d-none d-sm-inline">פרטי טיפול</span>
          <span className="d-inline d-sm-none">טיפול</span>
        </div>
        {active.l2 && <div className="arrow" />}
      </Breadcrumb.Item>
      <Breadcrumb.Item
        id="l3"
        href="#s3"
        active={active.l3}
        onClick={handleClick}
      >
        <div
          className={`s ${
            active.l3 || active.l4 ? 'breadcrumb-item-active' : ''
          }`}
        >
          <Badge pill variant="primary">
            3
          </Badge>
          <span className="d-none d-sm-inline">צירוף מסמכים</span>
          <span className="d-inline d-sm-none">מסמכים</span>
        </div>
        {active.l3 && <div className="arrow" />}
      </Breadcrumb.Item>

      <Breadcrumb.Item
        id="l4"
        href="#s3"
        active={active.l4}
        onClick={handleClick}
      >
        <div className={`s ${active.l4 ? 'breadcrumb-item-active' : ''}`}>
          <Badge pill variant="primary">
            4
          </Badge>
          <span className="d-none d-sm-inline">אמצעי להעברת תשלום</span>
          <span className="d-inline d-sm-none">תשלום</span>
        </div>

        {active.l4 && <div className="arrow" />}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
export default NavBreadcrumb;
