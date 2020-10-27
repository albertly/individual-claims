import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { ReactComponent as AddButton } from '../shared/img/add-button.svg';
import { MinusImg, AddImg } from '../shared/img';

// Style the Button component

const mimeWhiteList = [
  'image/png',
  'image/tiff',
  'image/jpeg',
  'image/tiff',
  'application/pdf',
];

const getThumbnail = (file: File): string => {
  if (file.type === 'application/pdf') {
    return '/img/pdf.svg';
  }
  if (file.type === 'image/tiff') {
    return '/img/tiff.svg';
  }
  return URL.createObjectURL(file);
};

const FileUploader = (props: any): React.ReactElement => {
  // Create a reference to the hidden file input element
  const hiddenFileInput: any = useRef(null);
  const [file, setFile] = useState<File | null | undefined>(props.value);

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
        {!file && (
          <>
            <i className="hsg-icon-file"></i>
            <label
              style={{ cursor: 'inherit' }}
              className="link-icon-color pr-1"
            >
              צירוף קובץ
            </label>
          </>
        )}

        {file && (
          <>
            <MinusImg />
            <label
              style={{ cursor: 'inherit' }}
              className="link-icon-color pr-1"
            >
              חסר קובץ
            </label>
          </>
        )}
      </Button>

      {file && (
        <img
          className="mx-2"
          style={{ width: '2rem', height: '2rem' }}
          src={getThumbnail(file)}
          alt={file.name}
        ></img>
      )}
      <p className="file-label d-inline px-2">{file ? file.name : 'לא נבחר קובץ'}</p>
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
