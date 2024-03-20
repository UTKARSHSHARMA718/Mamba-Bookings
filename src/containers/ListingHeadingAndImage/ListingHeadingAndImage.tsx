"use client"

import React from 'react'
import Image from 'next/image';

import Heading from '@/components/Headers/Heading';
import HeartButton from '@/components/HeartButton/HeartButton';
import { Listing } from '@prisma/client'
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import styles from './ListingHeadingAndImage.module.css';

type ListingHeadingAndImage = {
    currentUser: SafeUser | null;
    listingData: Listing | null;
}

const ListingHeadingAndImage: React.FC<ListingHeadingAndImage> = ({
    currentUser,
    listingData,
}) => {

    return (
        <div className={`
            flex
            flex-col
            p-6
            gap-4
        `}>
            <>
                <Heading
                    heading={listingData?.title}
                    subHeading={listingData?.description}
                />
                <div className='w-full h-full relative'>
                    <Image src={listingData?.imageSrc || ""} fill alt={`${listingData?.title}-image`}
                        className='w-full h-full rounded-xl'
                    />
                    <div className={styles.heartBtnContainer}>
                        <HeartButton listingId={listingData?.id || ""}  {...{ currentUser }} />
                    </div>
                </div>
            </>
        </div>
    )
}

export default ListingHeadingAndImage