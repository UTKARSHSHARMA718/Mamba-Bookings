'use client'
import React, { useEffect } from 'react'
import { User } from '@prisma/client'; // comming from our user model

import SearchBar from '../SearchBar/SearchBar';
import Profile from '../Profile/Profile';
import Logo from '../Logo/Logo';
import { COMPANY_NAME } from '@/constants/const';

type NavbarProps = {
  currentUser: User
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  console.log({ currentUser });

  return (
    <div className='p-4 flex justify-between items-center gap-2 border-b-[1px]'>
      <Logo />
      <SearchBar />
      <div className='flex gap-2 justify-center items-center'>
        <p className='hidden sm:block'>{COMPANY_NAME} your home</p>
        <Profile />
      </div>
    </div>
  )
}

export default Navbar