'use client'

import { FiSearch } from 'react-icons/fi'
import { IoMenu, IoCloseOutline } from 'react-icons/io5'

import Image from 'next/image'

import HimatiIcon from '@/assets/himati-icon.svg'
import Link from 'next/link'
import { useState } from 'react'
import { QuickLink } from '@/payload-types'

const MobileHeader = ({ links }: {links: QuickLink['links']}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    console.log('clicked')
    setIsOpen(!isOpen)
  }

  return (
    <header className="font-acronym md:hidden">
      <div className="flex flex-col items-center px-8 bg-[radial-gradient(circle,#CA0808_0%,#810404_61%)] py-2 relative">
        <div
          className="absolute  h-full inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:16px_16px]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 95%)',
            maskImage: 'radial-gradient(circle, transparent 60%, black 95%)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        ></div>
        <div className='flex flex-row items-center justify-between w-full z-10'> 
          <div className="flex flex-row items-center justify-between w-full">
            <IoMenu className="h-5 w-5 text-xl font-semibold text-white" onClick={toggleMenu} />
            <div className="flex flex-row items-center border-[1.5px] rounded-full pr-4">
              <Image src={HimatiIcon} alt="Himati Icon" className="h-11 w-11" />
              <h1 className="text-lg text-white">HIMATI</h1>
            </div>
            <FiSearch className="h-5 w-5 text-xl font-semibold text-white" />
          </div>
        </div>
        <nav
          className="h-screen w-2/5 fixed top-0 left-0 bg-negative-900 transition-all duration-300 ease-in-out transform translate-x-[-100%] z-20"
          style={{ transform: isOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <div className="px-8 py-6 flex justify-end w-full">
            <IoCloseOutline className="h-8 w-8 text-white" onClick={toggleMenu} />
          </div>

          <ul className="flex flex-col justify-center text-white font-bold">
            {links && links.map((link) => (
              <li key={link.id} className="border-b border-white px-8 py-4">
                <Link href={link.url}>{link.title.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default MobileHeader
