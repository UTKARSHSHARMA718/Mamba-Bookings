'use client'
import React, { useState } from 'react';

import Avatar from '../Avatar/Avatar';
import UserMenuDropDown from '@/containers/UserMenuDropDown/UserMenuDropDown';
import { AiOutlineMenu } from "react-icons/ai"
import useUserDropdown from '@/hooks/useUserDropdown';
import useOutsideClick from '@/hooks/useOutsideClick';

const Profile = () => {
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
    <div ref={shouldNotConsiderRef} className='p-2 relative cursor-pointer border rounded-3xl flex gap-3 justify-center items-center' onClick={toggleMenu}
    >
      <AiOutlineMenu />
      <div>
        <Avatar />
      </div>
      {
        isOpen &&
        <UserMenuDropDown {... { ref }} />
      }
    </div>
  )
}

export default Profile