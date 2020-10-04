import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function DocAttach(): React.ReactElement {
  let history = useHistory();

  function handleClick() {
    history.push('/second');
  }

  return (
    <>
      <main aria-labelledby="h2_p1">
        <h2 id="h2_p1" className="hidden">
          צירוף מסמכים
        </h2>
        <section className="row" aria-labelledby="mainBefore">
          <h3 id="mainBefore" className="col-md-3 col-xs-12 col-first">
            מסמכים נדרשים לתביעה
          </h3>          
          <div className="col-md-7 col-xs-12 col-last col-text-help">
            <div className="row">  
            <p className="col-12 text-right">
                 לטיפול מהיר ויעיל בבקשתך, נבקש להפקיד להלות כל המסמכים הנדרשים  
            </p>
            </div>
            <div className="row">
            <ul className="col-md-6 col-xs-12">
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
            <ul className="col-md-6 col-xs-12">
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
          <div className="col-md-2 d-xs-none"></div>
        </section>
      </main>
      <footer>
        <nav>
          <Button variant="primary" onClick={handleClick}>
            המשך
          </Button>
        </nav>
      </footer>
    </>
  );
}
export default DocAttach;
