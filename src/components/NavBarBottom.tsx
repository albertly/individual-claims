import React from 'react';
import Button from 'react-bootstrap/Button';

import GoBack from './GoBack';

function NavBarBottom({
  handleClick,
  handleBackClick,
}: {
  handleClick: any;
  handleBackClick?: any;
}): React.ReactElement {
  return (
    // className="navbar navbar-default navbar-fixed-bottom"
    // <div style={{ position: 'fixed', bottom: '2vh', left:'0', width: '100%' }}>
      <nav>
        {handleBackClick && <GoBack handleBackClick={handleBackClick} />}

        <Button variant="primary" onClick={handleClick}>
          המשך A
        </Button>
      </nav>
    // </div>
  );
}

export default NavBarBottom;


