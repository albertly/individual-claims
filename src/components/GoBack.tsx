import React from 'react';

function GoBack({
  handleBackClick,
}: {
  handleBackClick: any;
}): React.ReactElement {
  return (
    <>
      <a
        className="link-icon-color"
        style={{ textDecoration: 'underline' }}
        href="#"
        onClick={handleBackClick}
      >
        חזרה אחורה
      </a>
      <span className="px-2">או</span>
    </>
  );
}

export default GoBack;