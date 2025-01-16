import Image from 'next/image'
import HimatiIcon from '@/assets/himati-icon.svg'
import { MdOutlineEmail } from 'react-icons/md'
import { FaFacebook, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'

const QUICK_LINKS = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'News',
    link: '/',
  },
  {
    title: 'Features',
    link: '/',
  },
  {
    title: 'Culture',
    link: '/',
  },
  {
    title: 'Opinion',
    link: '/',
  },
  {
    title: 'Pamati',
    link: '/',
  },
  {
    title: 'About',
    link: '/',
  },
]

function Footer() {
  return (
    <footer className="bg-negative-900 h-full font-acronym text-white">
      <div className="px-8 max-w-screen-xl mx-auto ">
        <div className="py-8 lg:py-24 grid lg:grid-cols-5 lg:gap-24 gap-8">

          <div className="space-y-6 lg:col-span-2">
            <div className="inline-flex items-center border-[1.5px] rounded-full pl-4 pr-6">
              <div className="w-14 h:14 md:w-20 md:h-20">
                <Image src={HimatiIcon} alt="Himati Icon" />
              </div>
              <h1 className="ml-2 text-xl md:text-3xl font-semibold text-white">HIMATI</h1>
            </div>
            <p className="font-bold text-sm md:text-lg">
              HIMATI is the official student publication of the University of the Philippines
              Mindanao.
            </p>
            <div className='flex items-center gap-6'>
              <MdOutlineEmail size={24} />
              <span className="font-light text-sm lg:text-base">himati@up.edu.ph</span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h5 className="font-bold text-center lg:text-left">Quick Links</h5>
            <div className="grid grid-cols-2 gap-x-5 justify-items-center lg:justify-items-start">
              {QUICK_LINKS.map((link, index) => (
                <a key={index} href={link.link} className="block py-2">
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 flex flex-col items-center lg:block">
            <h5 className="font-bold">Connect with us</h5>
            <div className="flex gap-6">
              <Link href="/">
                <FaFacebook size={24} className="cursor-pointer" />
              </Link>
              <Link href="/">
                <FaXTwitter size={24} className="cursor-pointer" />
              </Link>
              <Link href="/">
                <FaTiktok size={24} className="cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full border-t-2 text-center pt-6 py-8 space-y-3 px-8'>
        <p>Himati House, Student Lane Center, Kalimudan Road, University of the Philippines Mindanao</p>
        <p>© 2024 HIMATI All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer
