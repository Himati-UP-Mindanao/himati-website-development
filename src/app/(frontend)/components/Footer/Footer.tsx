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
    <div className="bg-negative-900 h-full border font-acronym">
      <footer className="max-w-screen-xl mx-auto text-white">
        <div className="my-24 grid md:grid-cols-5 gap-24">
          <div className="space-y-6 md:col-span-2">
            <div className="inline-flex items-center border-[1.5px] rounded-full pl-4 pr-6">
              <div className="w-20 h-20">
                <Image src={HimatiIcon} alt="Himati Icon" />
              </div>
              <h1 className="ml-2 text-3xl font-semibold text-white">HIMATI</h1>
            </div>
            <p className="font-bold text-lg">
              HIMATI is the official student publication of the University of the Philippines
              Mindanao.
            </p>
            <div className='flex items-center gap-6'>
              <MdOutlineEmail size={24} />
              <span className="font-light">himati@up.edu.ph</span>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h5 className="font-bold">Quick Links</h5>
            <div className="grid grid-cols-2">
              {QUICK_LINKS.map((link, index) => (
                <a key={index} href={link.link} className="block py-2">
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
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
      </footer>
    </div>
  )
}

export default Footer
