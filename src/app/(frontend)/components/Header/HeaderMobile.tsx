import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMenu } from 'react-icons/io5';

import Image from 'next/image';

import HimatiIcon from '@/assets/himati-icon.svg';
import Link from 'next/link';

const LINKS = ["HOME", "NEWS", "FEATURES", "CULTTURES", "OPINION", "PAMATI", "ABOUT"]

const MobileHeader = () => {
  return (
    <header className="font-acronym md:hidden">
      <div className="flex flex-col items-center px-8 bg-[radial-gradient(circle,#CA0808_0%,#810404_61%)] py-2">
        <div className="flex flex-row items-center justify-between w-full">
          <IoMenu className="h-5 w-5 text-xl font-semibold text-white" />
          <div className="flex flex-row items-center border-[1.5px] gap-3 rounded-full pr-4">
            <Image src={HimatiIcon} alt="Himati Icon" className="h-14 w-14" />
            <h1 className="text-xl text-white">HIMATI</h1>
          </div>
          <FiSearch className="h-5 w-5 text-xl font-semibold text-white" />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
