import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';


import { getCares, ICare } from './services/Cares';
import { AppContext, Types as AppTypes } from './shared/contexApp';
import { Pages, Paths } from './shared/constants';

function Main(): React.ReactElement {
  let history = useHistory();
  const { state: stateApp, dispatch: dispatchApp } = useContext(AppContext);
  const [cares, setCares] = useState<ICare[]>([]);

  useEffect(() => {
    setCares(getCares());
  }, []);

  function handleClick() {
    dispatchApp({
      type: AppTypes.SetPage,
      payload: {
        page: Pages[Paths.INSURED],
      },
    });
    setTimeout(() => history.push(Paths.INSURED), 0);
  }

  return (
    <>
      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-strip">
            <div className="hsg-strip-side">
              <h3 className="hsg-strip-title">רגע לפני שמתחילים...</h3>
            </div>
            <div className="hsg-strip-content">
              <div className="hsg-strip-body">
                <p>
                  כדי שנוכל להתקדם בזריזות, אנחנו מבקשים שסריקה או צילום של
                  המסמכים הבאים תהיה בהישג ידך:
                </p>
                <ul className="hsg-list hsg-list-bullet">
                  <li>
                    חשבונית על טיפול השיניים שעברת (לא יתקבלו קבלות אלא חשבוניות
                    בלבד)
                  </li>
                  <li>צילומים שעברת בהקשר טיפול השיניים</li>
                  <li>
                    כל טופס, אישור, או מסמך רפואי אחר שקיבלת ממרפאת השיניים
                    בהקשר לטיפול זה
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="hsg-strip">
            <div className="hsg-strip-side">
              <h3 className="hsg-strip-title">טופס התביעה</h3>
            </div>
            <div className="hsg-strip-content">
              <div className="hsg-strip-body">
                <p>
                  כדי להגיש את התביעה עבור חלק מהטיפולים נדרש טופס פירוט ההליך
                  הרפואי כפי שמולא על ידי מרפאת השיניים.
                </p>
                <p>
                  <i className="hsg-icon-notice"></i>
                  עבור הטיפולים הללו אין צורך בטופס:
                </p>

                <div className="hsg-g">
                  <div className="hsg-c-small-6">
                    <ul className="hsg-list hsg-list-bullet">
                      <li>בדיקה</li>
                      <li>(הסרת אבן שן (שיננית</li>
                      <li>סתימה</li>
                      <li>סתימה לבנה</li>
                    </ul>
                  </div>
                  <div className="hsg-c-small-6">
                    <ul className="hsg-list hsg-list-bullet">
                      <li>עקירה</li>
                      <li>עקירה כירורגית</li>
                      <li>צילום נשך</li>
                      <li>צילום פריאפיקלי</li>
                    </ul>
                  </div>
                </div>

                <p>
                  אם לא קיבלת את הטופס, ניתן להורידו ולהעביר אותו למרפאה למילוי:
                  <br />
                  <a href="#">
                    <i className="hsg-icon-sheet"></i>
                    טופס פירוט ההליך הרפואי
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------- Footer with navigation  -------------------------------- */}

      <div className="hsg-g">
        <div className="hsg-c-12">
          <div className="hsg-text-background-white hsg-text-left">
            <button
              className="hsg-button hsg-button-primary"
              onClick={handleClick}
            >
              המשך
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Main;
