"use client"

import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import Image from 'next/image';
import { usePathname } from 'next/dist/client/components/navigation';

import Button from '@/components/Button/Button';
import Heading from '@/components/Headers/Heading';
import HeartButton from '@/components/HeartButton/HeartButton';
import { Listing } from '@prisma/client'
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import useLocalStoarge from '@/hooks/useLocalStorage';
import useQueryParams from '@/hooks/useQueryParams';
import useRentModal from '@/hooks/useRentModal';
import { RENT_MODAL_DATA } from '@/constants/const';
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
    const isShowEditButton = currentUser?.id === listingData?.userId;
    const currentPath = usePathname();

    const { onOpen } = useRentModal();
    const { setQueryParams } = useQueryParams();
    const { storeValues } = useLocalStoarge();

    const openRentModalHandler = () => {
        setQueryParams({ queryName: "rent-modal", value: "edit", currentUrl: currentPath || "" });
        const payload = {
            category: listingData?.category,
            location: listingData?.locationValue,
            guestCount: listingData?.guestCount,
            roomCount: listingData?.roomCount,
            bathroomCount: listingData?.bathroomCount,
            imageSrc: listingData?.imageSrc,
            price: listingData?.price,
            title: listingData?.title,
            description: listingData?.description,
        }
        storeValues(RENT_MODAL_DATA, payload);
        onOpen();
    }

    return (
        <div className={` ${commonStyles.container} m-auto flex flex-col p-6 gap-4 max-w-[1200px]`}>
            <>
                <div className='p-1 flex gap-4 justify-center items-center'>

                    <Heading
                        heading={listingData?.title}
                        subHeading={listingData?.description}
                    />
                    {
                        isShowEditButton &&
                        <Button
                            label='Edit'
                            onClick={openRentModalHandler}
                            icon={FaEdit}
                            customStyles={styles.button}
                        />
                    }
                </div>
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