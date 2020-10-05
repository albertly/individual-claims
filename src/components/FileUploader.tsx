import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import { ReactComponent as AddButton } from '../shared/img/add-button.svg';

// Style the Button component

const mimeWhiteList = [
  'image/png',
  'image/tiff',
  'image/jpeg',
  'image/tiff',
  'application/pdf',
];

const FileUploader = (props: any): React.ReactElement => {
  // Create a reference to the hidden file input element
  const hiddenFileInput: any = useRef(null);
  const [file, setFile] = useState<File | null>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event: any): void => {
    const fileUploaded: File = event.target.files[0];
    const fileType = fileUploaded.type;
    setFile(fileUploaded);
    props.handleFile(fileUploaded);
  };

  return (
    <>
      <Button
        className="bg-transparent border-0 px-0 py-0"
        onClick={handleClick}
      >
        {/* <FontAwesomeIcon
          className="link-icon-color d-inline"
          icon={faPlusSquare}
        /> */}
        <AddButton
          className="link-icon-color"
          style={{ height: '1.2rem', width: '1.2rem' }}
          stroke="#006CB2"
          fill="#006CB2"
        />
        <label className="link-icon-color pr-1">צירוף קובץ</label>
      </Button>
      {file && <p className="d-inline px-5">{file.name}</p>}
      {/* <Image.AddButton className="link-icon-color" style={{height: '1rem', width: '1rem'}} src={Image.AddButton} /> */}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept={mimeWhiteList.join(', ')}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default FileUploader;
