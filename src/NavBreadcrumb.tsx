import React, { useState, useEffect, useContext } from 'react';
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
    <div className="hsg-g">
      <div className="hsg-c-12">
        <div className="hsg-steps" aria-label="breadcrumb">
          <div
            id="l1"
            onClick={handleClick}
            aria-current={active.l1 ? 'page' : 'false'}
            className={`hsg-step ${
              active.l1 
                ? 'hsg-step-active'
                : ''
            }`}
          >
            <span>פרטי המבוטח</span>
          </div>

          <div
            id="l2"
            onClick={handleClick}
            aria-current={active.l2 ? 'page' : 'false'}
            className={`hsg-step ${
              active.l2  ? 'hsg-step-active' : ''
            }`}
          >
            <span>פרטי הטיפול</span>
          </div>

          <div
            id="l3"
            onClick={handleClick}
            aria-current={active.l3 ? 'page' : 'false'}
            className={`hsg-step ${
              active.l3  ? 'hsg-step-active' : ''
            }`}
          >
            <span>צירוף מסמכים</span>
          </div>
          <div
            id="l4"
            onClick={handleClick}
            aria-current={active.l4 ? 'page' : 'false'}
            className={`hsg-step ${active.l4 ? 'hsg-step-active' : ''}`}
          >
            <span>אמצעי להעברת תשלום</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBreadcrumb;
