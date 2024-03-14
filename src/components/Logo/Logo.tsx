'use client'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import { HOME } from '@/constants/routeNames';

const Logo = () => {
    const router = useRouter();
    const Logo = "/images/airbnb-logo.png";

  return (
    <div onClick={()=>router.push(HOME)} className='p-1 cursor-pointer hidden md:block'>
           <Image src={Logo} width={100} height={200} alt='Company Logo' />
    </div>
  )
}

export default Logo