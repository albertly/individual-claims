import React, { useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Badge from 'react-bootstrap/Badge';
import { useHistory } from "react-router-dom";

import './NavBreadcrumb.css';

interface IActive {
    [key: string]: boolean;
}


function NavBreadcrumb(): React.ReactElement {
    const [active, setActive] = useState<IActive>({ l1: true, l2: false, l3: false, l4: false });
    let history = useHistory();

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

        switch(prop) {
            case 'l1':
                history.push("/second");
                break;
            case 'l2':
                history.push("/second/treatdetails");
                break;
        }  
        console.log('click', e.id);
    };
    return (
        <Breadcrumb style={{ marginRight: '0.2rem', marginLeft: '0.2rem' }}>
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
      </Breadcrumb>
    )
}
export default NavBreadcrumb;