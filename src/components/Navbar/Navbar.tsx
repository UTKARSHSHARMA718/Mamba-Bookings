'use client'

import React from 'react'
import toast from 'react-hot-toast';
import { usePathname } from 'next/dist/client/components/navigation';


import Logo from '../Logo/Logo';
import Profile from '../Profile/Profile';
import SearchBar from '../SearchBar/SearchBar';
import ThemeSwitcher from '@/Theme/ThemeSwitcher';
import useLoginModal from '@/hooks/useLoginModal';
import useQueryParams from '@/hooks/useQueryParams';
import useRentModal from '@/hooks/useRentModal';
import useSearchModal from '@/hooks/useSearchModalt';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import { STEPS } from '@/enums/SearchModalEnum';

type NavbarProps = {
  currentUser: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  const { onOpen, setScreen } = useSearchModal();
  const { onOpen: onLoginOpen } = useLoginModal();
  const { setQueryParams } = useQueryParams();
  const rentModal = useRentModal();
  const currentPath = usePathname();
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
  const openRentModalHandler = () => {
    if (!currentUser) {
      toast.error('Your are not logged in, Please log in first');
      onLoginOpen();
      return;
    }
    // TODO: make a constant varaiable for this query name
    setQueryParams({ queryName: "rent-modal", value: "open", currentUrl: currentPath || "" });
    rentModal?.onOpen();
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
        <ThemeSwitcher />
        <p
          onClick={openRentModalHandler}
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
        <Profile isUserLoggedIn={!!currentUser} {...{ openRentModalHandler }} />
      </div>
    </div>
  )
}

export default Navbar