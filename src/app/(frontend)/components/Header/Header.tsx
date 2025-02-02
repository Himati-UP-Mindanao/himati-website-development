import React from 'react'
import { getQuickLinks } from '../../lib/api/fetchPayload'
import dynamic from 'next/dynamic'

const MobileHeader = dynamic(() => import('./HeaderMobile'))
const DesktopHeader = dynamic(() => import('./DesktopHeader'))

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
