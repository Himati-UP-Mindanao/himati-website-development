import React from 'react';

// import DesktopHeader from './DesktopHeader';
import MobileHeader from './HeaderMobile';
import DesktopHeader from './DesktopHeader';

const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

export default Header;