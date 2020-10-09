import React, { useState, useEffect, useContext } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Badge from 'react-bootstrap/Badge';
import { useHistory, Link } from 'react-router-dom';

import {
  AppContext,
  NavigationType,
  Types,
  Direction,
} from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import './NavBreadcrumb.css';

interface IActive {
  [key: string]: boolean;
}

function NavBreadcrumb(): React.ReactElement {
  const { state, dispatch } = useContext(AppContext);

  const [active, setActive] = useState<IActive>({
    l1: false,
    l2: false,
    l3: false,
    l4: false,
  });

  useEffect(() => {
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    let prop = `l${Pages[Paths.INSURED]}`;
    switch (window.location.pathname) {  //ToDo: Refactor! No need for switch
      case Paths.INSURED:
        prop =  `l${Pages[Paths.INSURED]}`;
        break;
      case Paths.TREATMENT:
        prop = `l${Pages[Paths.TREATMENT]}`;
        break;
      case Paths.DOCS:
        prop = `l${Pages[Paths.DOCS]}`;
        break;
      case Paths.PAYMENT:
      case Paths.FINISH:
        prop = `l${Pages[Paths.PAYMENT]}`;
        break;
    }
    setActive({ ...obj, [prop]: true });
  }, [window.location.pathname]);

  let history = useHistory();

  const handleClick: React.ReactEventHandler = (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const e: any = event.currentTarget;              //ToDo: Why? obj1 - no use
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    const prop: string = e.id;
    obj[prop] = true;

    const obj1: IActive = { ...obj, [prop]: true };

    //  setActive(obj1);

    switch (prop) {                                   //ToDo: Refactor! No need for switch
      case `l${Pages[Paths.INSURED]}`:
        dispatch({
          type: Types.SetPage,
          payload: { page: Pages[Paths.INSURED], direction: Direction.Forward },
        });
        setTimeout(()=>history.push(Paths.INSURED), 0);
        
        break;
      case `l${Pages[Paths.TREATMENT]}`:
        dispatch({
          type: Types.SetPage,
          payload: {
            page: Pages[Paths.TREATMENT],
            direction: Direction.Forward,
          },
        });
        setTimeout(()=>history.push(Paths.TREATMENT), 0);

        break;
      case `l${Pages[Paths.DOCS]}`:
        dispatch({
          type: Types.SetPage,
          payload: {
            page: Pages[Paths.DOCS],
            direction: Direction.Forward,
          },
        });
        setTimeout(()=>history.push(Paths.DOCS), 0);

        break;
      case `l${Pages[Paths.PAYMENT]}`:
        dispatch({
          type: Types.SetPage,
          payload: {
            page: Pages[Paths.PAYMENT],
            direction: Direction.Forward,
          },
        });
        setTimeout(()=>history.push(Paths.PAYMENT), 0);
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
