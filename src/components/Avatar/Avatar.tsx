import React from 'react'
import Image from 'next/image';

type AvatarTypes = {
    image?: string;
}

const Avatar: React.FC<AvatarTypes> = ({
    image
}) => {
    // TODO: update it with image from database
    const placeHolderImage = '/images/placeholder.jpg';

    return (
        <Image src={image || placeHolderImage} alt={'placeholder image'} width={20} height={20} className='rounded-full cursor-pointer' />
    )
}

export default Avatar