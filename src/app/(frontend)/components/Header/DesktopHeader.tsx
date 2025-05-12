import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import HimatiIcon from '@/assets/himati-icon.svg'
import { QuickLink } from '@/payload-types'

const DesktopHeader = ({ links }: { links: QuickLink['links'] }) => {
  return (
    <header className="hidden font-acronym lg:block">
      <div className="bg-[radial-gradient(circle,#CA0808_0%,#810404_61%)] items-center flex justify-center relative">
        <div
          className="absolute  h-full inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:32px_32px]"
          style={{
            WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 95%)',
            maskImage: 'radial-gradient(circle, transparent 60%, black 95%)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        ></div>
        <div className="flex flex-col items-center py-5 max-w-screen-xl w-full relative z-10">
          {/* Overlay for grid pattern */}
          {/* <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_100%_0%,#000_0%,transparent_40%)]"></div> */}

          <div className="mb-5">
            <p className="text-neutral-50 font-guardian">matapang, makabuluhan, mapagpalaya</p>
          </div>

          <div className="flex items-center border-[1.5px] rounded-full pl-4 pr-6 mb-8">
            <div className="w-20 h-20">
              <Image src={HimatiIcon} alt="Himati Icon" />
            </div>
            <h1 className="ml-2 text-3xl font-semibold text-white">HIMATI</h1>
          </div>

          <nav className="mt-1 flex items-center gap-16">
            {links &&
              links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-base font-semibold text-white transition-colors duration-300 hover:text-gray-300"
                >
                  {link.title.toUpperCase()}
                </Link>
              ))}

            {/* <div className="border-1 ml-4 flex items-center rounded-full border-black bg-white p-2">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent pl-1 font-bold text-black placeholder-black focus:outline-none"
              />
              <IoSearchSharp className="ml-2" />
            </div> */}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
