"use client"

import React from 'react'

import Image from 'next/image';

import Heading from '@/components/Headers/Heading';
import HeartButton from '@/components/HeartButton/HeartButton';

import { Listing } from '@prisma/client'
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import styles from './ListingHeadingAndImage.module.css';
import commonStyles from "@/common/styles/commonStyls.module.css";

type ListingHeadingAndImage = {
    currentUser: SafeUser | null;
    listingData: Listing | null;
}

const ListingHeadingAndImage: React.FC<ListingHeadingAndImage> = ({
    currentUser,
    listingData,
}) => {

    return (
        <div className={` ${commonStyles.container} m-auto flex flex-col p-6 gap-4 max-w-[1200px]`}>
            <>
                <div className='p-1 flex gap-4 justify-center items-center'>

                    <Heading
                        heading={listingData?.title}
                        subHeading={listingData?.description}
                    />
                </div>
                <div className='w-full h-full relative'>
                    <Image src={listingData?.imageSrc || ""} fill alt={`${listingData?.title}-image`}
                        className='w-full h-full rounded-xl max-h-[600px]'
                        style={{maxHeight: 600}}
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