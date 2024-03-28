'use client'

import React from 'react';
import { AiOutlineMenu } from "react-icons/ai"

import Avatar from '../Avatar/Avatar';
import UserMenuDropDown from '@/containers/UserMenuDropDown/UserMenuDropDown';
import useOutsideClick from '@/hooks/useOutsideClick';
import useUserDropdown from '@/hooks/useUserDropdown';

type ProfileTypes = {
  isUserLoggedIn: boolean;
  openRentModalHandler: () => void;
}

const Profile: React.FC<ProfileTypes> = ({ isUserLoggedIn, openRentModalHandler }) => {
  // TODO: I think we should remove this
  const { isOpen, onOpen, onClose } = useUserDropdown();
  const { ref, shouldNotConsiderRef } = useOutsideClick({
    callback: () => {
      onClose();
    }
  });
  const toggleMenu = () => {
    if (isOpen) {
      onClose();
      return;
    }
    onOpen();
  };

  return (
    // @ts-ignore
    <div ref={shouldNotConsiderRef} className='p-2 relative cursor-pointer border rounded-3xl flex gap-3 justify-center items-center hover:shadow-md dark:hover:shadow-white' onClick={toggleMenu}
    >
      <AiOutlineMenu />
      <div>
        <Avatar />
      </div>
      {
        isOpen &&
        <UserMenuDropDown {... { ref, isUserLoggedIn, openRentModalHandler }} />
      }
    </div>
  )
}

export default Profile