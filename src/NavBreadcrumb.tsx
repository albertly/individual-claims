import React, { useState, useEffect, useContext } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useHistory, Link } from 'react-router-dom';

import {
  AppContext,
  NavigationType,
  Types,
  Direction,
} from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

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
    let prop = `l${Pages[Paths.INSURED]}`; //ToDo: Refactor! No need for switch
    switch (window.location.pathname) {
      case Paths.INSURED:
        prop = `l${Pages[Paths.INSURED]}`;
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

  function getPath() {
    const o = Object.entries(Pages).find(e => e[1] === state.navigation.page);
    return o ? (o[0] as Paths) : Paths.MAIN;
  }

  const handleClick: React.ReactEventHandler = (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const e: any = event.currentTarget; //ToDo: Why? obj1 - no use
    const obj: IActive = { l1: false, l2: false, l3: false, l4: false };
    const prop: string = e.id;
    obj[prop] = true;

    const obj1: IActive = { ...obj, [prop]: true };

    //ToDo: Refactor! No need for switch
    switch (prop) {
      case `l${Pages[Paths.INSURED]}`:
        dispatch({
          type: Types.SetPage,
          payload: { page: Pages[Paths.INSURED] },
        });
        setTimeout(() => history.push(Paths.INSURED), 0);

        break;
      case `l${Pages[Paths.TREATMENT]}`:
        dispatch({
          type: Types.SetPage,
          payload: { page: Pages[Paths.TREATMENT] },
        });
        setTimeout(() => history.push(Paths.TREATMENT), 0);

        break;
      case `l${Pages[Paths.DOCS]}`:
        dispatch({
          type: Types.SetPage,
          payload: { page: Pages[Paths.DOCS] },
        });
        setTimeout(() => history.push(Paths.DOCS), 0);

        break;
      case `l${Pages[Paths.PAYMENT]}`:
        dispatch({
          type: Types.SetPage,
          payload: { page: Pages[Paths.PAYMENT] },
        });
        setTimeout(() => history.push(Paths.PAYMENT), 0);
        break;
    }
  };

  return (
    <nav
      style={{ marginRight: '0.2rem', marginLeft: '0.2rem' }}
      aria-label="breadcrumb"
    >
      <ol className="breadcrumb">
        <li
          id="l1"
          onClick={handleClick}
          className="breadcrumb-item"
          aria-current={active.l1 ? 'page' : 'false'}
        >
          <div
            className={`s ${
              active.l1 || active.l2 || active.l3 || active.l4
                ? 'breadcrumb-item-active'
                : ''
            }`}
          >
            <span className="badge badge-pill badge-primary">1</span>
            <span className="d-none d-sm-inline">פרטי מבוטח</span>
            <span className="d-inline d-sm-none">מבוטח</span>
          </div>
          {active.l1 && <div className="arrow" />}
        </li>

        <li
          id="l2"
          className="breadcrumb-item"
          onClick={handleClick}
          aria-current={active.l2 ? 'page' : undefined}
        >
          <div
            className={`s ${
              active.l2 || active.l3 || active.l4
                ? 'breadcrumb-item-active'
                : ''
            }`}
          >
            <span className="badge badge-pill badge-primary">2</span>
            <span className="d-none d-sm-inline">פרטי טיפול</span>
            <span className="d-inline d-sm-none">טיפול</span>
          </div>
          {active.l2 && <div className="arrow" />}
        </li>
        <li
          id="l3"
          className="breadcrumb-item"
          onClick={handleClick}
          aria-current={active.l3 ? 'page' : undefined}
        >
          <div
            className={`s ${
              active.l3 || active.l4 ? 'breadcrumb-item-active' : ''
            }`}
          >
            <span className="badge badge-pill badge-primary">3</span>
            <span className="d-none d-sm-inline">צירוף מסמכים</span>
            <span className="d-inline d-sm-none">מסמכים</span>
          </div>
          {active.l3 && <div className="arrow" />}
        </li>

        <li
          id="l4"
          className="breadcrumb-item"
          onClick={handleClick}
          aria-current={active.l4 ? 'page' : undefined}
        >
          <div className={`s ${active.l4 ? 'breadcrumb-item-active' : ''}`}>
            <span className="badge badge-pill badge-primary">4</span>
            <span className="d-none d-sm-inline">אמצעי להעברת תשלום</span>
            <span className="d-inline d-sm-none">תשלום</span>
          </div>
          {active.l4 && <div className="arrow" />}
        </li>
      </ol>
    </nav>
  );
}
export default NavBreadcrumb;
