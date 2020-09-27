import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faFileAudio,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faCircle } from '@fortawesome/free-regular-svg-icons';

import { getCares, ICare } from './services/Cares';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Main.module.css';

function Main(): React.ReactElement {
  let history = useHistory();
  const [cares, setCares] = useState<ICare[]>([]);

  useEffect(() => {
    setCares(getCares());
  }, []);

  function handleClick() {
    history.push('/second');
  }

  return (
    <>
      <section>
        <div className={`row justify-content-center ${styles.row_one}`}>
          <div className="col-3 col-first">רגע לפני שמתחילים...</div>
          <div className="col col-last col-text-help">
            <p>
              כדי שנוכל להתקדם בזריזות, אנחנו מבקשים שסריקה או צילום של המסמכים
              תהיה ההישג ידך:
            </p>
            <ul>
              <li>
                חשבונית על טיפול השיניים שעברת (לא יתקבלות קבלות אלא חשבוניות
                בלבד)
              </li>
              <li>צילומים שעברת בהקשר טיפול השיניים</li>
              <li>
                כל טופס, אישור, או מסמך רפואי אחר שקיבלת ממרפאת השיניים בהקשר
                לטיפול זה
              </li>
            </ul>
          </div>
        </div>
        <div className={`row ${styles.row_two}`}>
          <div className="col-3 col-first">טופס התביעה</div>
          <div className="col col-last">
            <div className="row">
              <div className="col col-text-help">
                כדי להגיש את התביעה עבור חלק מהטיפולים נדרש טופס פירוט ההליך
                הרפואי כפי שמולא על ידי מרפאת השיניים.
              </div>
            </div>
            <div className="row">
              <div className="col-1" style={{ flexBasis: '1rem' }}>
                <FontAwesomeIcon icon={faExclamationCircle} color="#006CB2" />
              </div>
              <div
                className="col pr-1 col-text-help"
                style={{ paddingTop: '0.5rem' }}
              >
                עבור הטיפולים הללו אין צורך בטופס:
              </div>
            </div>
            <div className="row">
              <div className="col col-text-help">
                <div className="row">
                  <div className="col">
                    <ul>
                      {cares.map((el: ICare, i: number) => {
                        const count = Math.floor(cares.length / 2);
                        return i < count ? (
                          <li key={el.item}>{el.item}</li>
                        ) : undefined;
                      })}
                    </ul>
                  </div>
                  <div className="col">
                    <ul>
                      {cares.map((el: ICare, i: number) => {
                        const count = Math.ceil(cares.length / 2);
                        return i >= count ? (
                          <li key={el.item}>{el.item}</li>
                        ) : undefined;
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <span
                  className="fa-layers fa-fw"
                  style={{ fontSize: '1.5rem' }}
                >
                  <FontAwesomeIcon icon={faCircle} size="lg" color="#006CB2" />
                  <FontAwesomeIcon icon={faFileAlt} size="xs" color="#006CB2" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Button variant="primary" onClick={handleClick}>
        המשך
      </Button>
    </>
  );
}
export default Main;
