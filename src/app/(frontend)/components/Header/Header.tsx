import React from 'react'

// import DesktopHeader from './DesktopHeader';
import MobileHeader from './HeaderMobile'
import DesktopHeader from './DesktopHeader'
import { getQuickLinks } from '../../lib/api/fetchPayload'

const Header = async () => {
  const links = await getQuickLinks()

  return (
    <>
      <DesktopHeader links={links} />
      <MobileHeader links={links} />
    </>
  )
}

export default Header;
