import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faCircle } from '@fortawesome/free-regular-svg-icons';

import { getCares, ICare } from './services/Cares';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div>
      <main aria-labelledby="h2_p1">
        <h2 id="h2_p1" className="hidden">
          דף נחיתה
        </h2>
        <section className="row" aria-labelledby="mainBefore">
          <h3 id="mainBefore" className="col-md-3 col-xs-12 col-first">
            רגע לפני שמתחילים...
          </h3>
          <div className="col-md-9 col-xs-12 col-last col-text-help">
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
        </section>
        <section className="row" aria-labelledby="claimDoc">
          <h3 id="claimDoc" className="col-md-3 col-xs-12 col-first">
            טופס התביעה
          </h3>
          <div className="col-md-9 col-xs-12 col-last">
            <div className="row">
              <div className="col-12 col-text-help">
                כדי להגיש את התביעה עבור חלק מהטיפולים נדרש טופס פירוט ההליך
                הרפואי כפי שמולא על ידי מרפאת השיניים.
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-text-help">
                <FontAwesomeIcon                  
                  className="icon-font-size va-m ml-2 link-icon-color"
                  icon={faExclamationCircle}                  
                />
                עבור הטיפולים הללו אין צורך בטופס:
              </div>
            </div>
            <div className="row">
              <div className="col col-text-help">
                <div className="row">
                  <div className="col-xs-12 col-md-4">
                    <ul>
                      {cares.map((el: ICare, i: number) => {
                        const count = Math.floor(cares.length / 2);
                        return i < count ? (
                          <li key={el.item}>{el.item}</li>
                        ) : undefined;
                      })}
                    </ul>
                  </div>
                  <div className="col-sx-12 col-md-4">
                    <ul>
                      {cares.map((el: ICare, i: number) => {
                        const count = Math.ceil(cares.length / 2);
                        return i >= count ? (
                          <li key={el.item}>{el.item}</li>
                        ) : undefined;
                      })}
                    </ul>
                  </div>
                  <div className="col col-md-4"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-text-help">
                אם לא קיבלת את הטופס, ניתן להורידו ולהעביר אותו למרפאה למילוי:
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-text-help">
                <span className="fa-layers fa-fw icon-font-size va-m ml-2">
                  <FontAwesomeIcon className="link-icon-color" icon={faCircle} size="lg"  />
                  <FontAwesomeIcon className="link-icon-color" icon={faFileAlt} size="xs" />
                </span>
                <a className="link-icon-color" href="#">
                  טופס פירוט ההליך הרפואי
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <nav>
          <Button variant="primary" onClick={handleClick}>
            המשך
          </Button>
        </nav>
      </footer>
    </div>
  );
}
export default Main;
