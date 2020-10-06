import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import Button from 'react-bootstrap/Button';

import FileUpload from './components/FileUploader';
import { ExclamationImg } from './shared/img';

function DocAttach(): React.ReactElement {
  let history = useHistory();

  function handleClick() {
    history.push('/second/payment');
  }

  const fileSelectedHandler = (event: any) => {
    console.log(event.target.files[0]);
  };

  return (
    <div>
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

            {/* File 1 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 border-bottom border-secondary text-right">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="invoceTreat">חשבונית עבור הטיפול</label>
                <label className="mr-2 text-danger">*</label>
              </div>

              <div className="col-md-5 col-xs-12 border-bottom border-secondary text-right">
                <FileUpload
                  id="invoceTreat"
                  handleFile={(e: any) => {
                    console.log('file', e);
                  }}
                />
              </div>

              <div className="col-md-2 d-xs-none" />
            </div>

            {/* File 2 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 text-right border-bottom border-secondary">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="invoceTreat">טופס פירוט ההליך הרפואי</label>
                <label className="mr-2 text-danger">*</label>
              </div>

              <div className="col-md-5 col-xs-12 text-right border-bottom border-secondary">
                <FileUpload
                  id="medicalDoc"
                  handleFile={(e: any) => {
                    console.log('file', e);
                  }}
                />
              </div>
              <div className="col-md-2 d-xs-none" />
            </div>

            {/* File 3 */}
            <div className="row mb-md-5 mt-md-2">
              <div className="col-md-5 col-xs-12 text-right border-bottom border-secondary">
                <ExclamationImg css="link-icon-color ml-1" />
                <label htmlFor="invoceTreat">
                  צילומים, מסמכים או אישורים נוספים
                </label>
              </div>

              <div className="col-md-5 col-xs-12 text-right border-bottom border-secondary">
                <FileUpload
                  id="miscellaneousDoc"
                  handleFile={(f: any) => {
                    console.log('file', f);
                    console.log('file obj', JSON.stringify(f));                    
                    f.arrayBuffer().then((b: any) => console.log('file buffer', b));
                  }}
                />
              </div>

              <div className="col-md-2 d-xs-none" />
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
    </div>
  );
}
export default DocAttach;
