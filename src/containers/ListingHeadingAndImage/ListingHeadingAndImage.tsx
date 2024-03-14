import Heading from '@/components/Headers/Heading';
import { Listing } from '@prisma/client'
import Image from 'next/image';
import React from 'react'

type ListingHeadingAndImageTypes = {
    data: Listing;
}

const ListingHeadingAndImage: React.FC<ListingHeadingAndImageTypes> = ({
    data,
}) => {
    const { imageSrc, title, description } = data;

    return (
        <div className={`
            flex
            flex-col
            p-6
            gap-4
        `}>
            <Heading
                heading={title}
                subHeading={description}
            />
            <div className='w-full h-full relative'>
                <Image src={imageSrc} fill alt={`${title}-image`} 
                    className='w-full h-full rounded-xl'
                />
            </div>
        </div>
    )
}

export default ListingHeadingAndImage