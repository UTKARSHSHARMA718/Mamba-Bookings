import React from 'react'
import Image from 'next/image';

import PlaceHolder from "@/../public/images/placeholder.jpg"

type AvatarTypes = {
    image?: string;
    size?: number;
}

const Avatar: React.FC<AvatarTypes> = ({
    image,
    size = 20,
}) => {

    return (
        <Image src={image || PlaceHolder?.src} alt="user-profile-image" width={size} height={size} className='rounded-full cursor-pointer' />
    )
}

export default Avatar