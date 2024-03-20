'use client'

import React from 'react'

import Logo from '../Logo/Logo';
import Profile from '../Profile/Profile';
import SearchBar from '../SearchBar/SearchBar';
import useRentModal from '@/hooks/useRentModal';
import useSearchModal from '@/hooks/useSearchModalt';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import { STEPS } from '@/enums/SearchModalEnum';
import { COMPANY_NAME } from '@/constants/const';

type NavbarProps = {
  currentUser: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const { onOpen, setScreen } = useSearchModal();
  const rentModal = useRentModal();
  const handleClickAnyWhere = () => {
    setScreen(STEPS.LOCATION);
    onOpen();
  }
  const handleClickAnyWeek = () => {
    setScreen(STEPS.DAYS);
    onOpen();
  }
  const handleClickAddGuests = () => {
    setScreen(STEPS.GUESTS);
    onOpen();
  }

  return (
    <div className='p-4 flex justify-between items-center gap-2 border-b-[1px]'>
      <Logo />
      <SearchBar
        onClickAnyWeek={handleClickAnyWeek}
        onClickAnywhere={handleClickAnyWhere}
        onClickGuets={handleClickAddGuests}
        onSearchClick={handleClickAnyWhere}
      />
      <div className='flex gap-2 justify-center items-center'>
        <p 
        onClick={rentModal?.onOpen}
        className="
        hidden 
        sm:block 
        font-bold 
        text-sm 
        p-2 
        px-3 
        border-[1px] 
        rounded-3xl 
        cursor-pointer 
        border-white 
        hover:border-slate-200
        ">
          Add your home
        </p>
        <Profile isUserLoggedIn={!!currentUser} />
      </div>
    </div>
  )
}

export default Navbar