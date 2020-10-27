import React from 'react';
import { ReactComponent as AddButtonSvg } from './add-button.svg';
import { ReactComponent as ExclamationSvg } from './exclamation.svg';
import { ReactComponent as MinusButtonSvg } from './minus-circular-button.svg';

const AddImg = (props: any): React.ReactElement => {
  return (
    <AddButtonSvg
      className="link-icon-color"
      style={{ height: '1.2rem', width: '1.2rem' }}
      stroke="#006CB2"
      fill="#006CB2"
    />
  );
};

const ExclamationImg = (props: any): React.ReactElement => {
    const css = props.css;
    return (
      <ExclamationSvg
        className={css ? css : "link-icon-color"}
        style={{ height: '1.2rem', width: '1.2rem' }}
        stroke="#006CB2"
        fill="#006CB2"
      />
    );
  };

  const MinusImg = (props: any): React.ReactElement => {    
    return (
      <MinusButtonSvg
        className="link-icon-color"
        style={{ height: '1.4rem', width: '1.4rem', verticalAlign: 'middle' }}
        stroke="#006CB2"
        fill="#006CB2"
      />
    );
  };

export { AddImg, ExclamationImg, MinusImg };
