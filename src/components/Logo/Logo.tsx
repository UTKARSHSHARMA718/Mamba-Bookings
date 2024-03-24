'use client'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

import { HOME } from '@/constants/routeNames';

const Logo = () => {
    const router = useRouter();
    const Logo = "/images/Mamba_bookings-removebg-preview.png";

  return (
    <div onClick={()=>router.push(HOME)} className='p-1 cursor-pointer hidden md:block'>
           <Image src={Logo} width={100} height={200} alt='Company Logo' className='dark:brightness-[200%] dark:saturate-[2300%]' />
    </div>
  )
}

export default Logo