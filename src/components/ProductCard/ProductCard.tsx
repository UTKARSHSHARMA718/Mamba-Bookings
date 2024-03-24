'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { format } from 'date-fns';

import Button from '../Button/Button';
import HeartButton from '../HeartButton/HeartButton';
import useCountryInfo from '@/hooks/useCountryInfo';
import { currencyNumberFormatter } from '@/libs/utils/util';
import { LISTING } from '@/constants/routeNames';
import { Reservation } from '@prisma/client';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';

type ProductCardType = {
    price: number;
    imgSrc: string;
    listingId: string;
    onAction?: (value: string) => void;
    actionLabel?: string;
    reservation?: Reservation | null;
    disabled?: boolean;
    currentUser: SafeUser | null;
    locationValue: string;
    category: string;
}

const ProductCard: React.FC<ProductCardType> = ({
    price,
    imgSrc,
    listingId,
    onAction,
    actionLabel,
    reservation,
    disabled,
    currentUser,
    locationValue,
    category,
}) => {
    const dummyImageUrl = '/images/fallback image.jpg'; // TODO: provide dummy URL
    const router = useRouter();

    const [mounted, setMounted] = useState(false);



    const { getCountryByValue } = useCountryInfo();
    const location = getCountryByValue(locationValue);

    const getReservationDates = useCallback(() => {
        if (!reservation) {
            return;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation?.startDate, reservation?.endDate]);

    const handleOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e?.stopPropagation();
        if (disabled || !listingId) {
            return;
        }

        onAction?.(listingId);
    }, [onAction, disabled, listingId]);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return <></>;
    }

    return (
        <div
            onClick={() => router.push(`${LISTING}/${listingId}`)}
            className={`
            p-6
            rounded-xl 
            flex-col
            gap-2;
            max-h-[40vh]
            cursor-pointer
            flex
            justify-center
            items-center
            relative
            `}>
            <div style={{ zIndex: "9" }} className={`
                absolute
                top-7
                right-8
            `}>
                <HeartButton listingId={listingId} {...{ currentUser }} />
            </div>
            <div className={`
                w-full
                h-3/4
                overflow-hidden
                rounded-xl
                cursor-pointer
            `}>
                <Image src={imgSrc || dummyImageUrl} width={100} height={100} alt={`${location?.[0]?.label}-image`}
                    className='transition duration-100 rounded-xl max-h-full h-full w-full hover:scale-125' />
            </div>
            <div className='flex flex-col gap-1  w-full items-start p-4 px-0 h-1/4'>
                <div className='flex flex-col gap-2 justify-start items-start'>
                    <p className='text-slate-700 text-sm font-semibold dark:text-white'>
                        {location[0]?.label}, {location[0]?.region}
                    </p>
                    <p className='text-slate-700 text-sm font-semibold dark:text-white'>
                        {category}
                    </p>
                </div>
                <div className='flex gap-1 justify-center items-start'>
                    <p className='text-black font-bold text-xs dark:text-white'>{currencyNumberFormatter(price)}</p>
                    {!reservation && <p className='text-xs'>nights</p>}
                </div>
                {
                    reservation &&
                    <p className='text-slate-500 text-xs font-medium'>
                        {getReservationDates()}
                    </p>
                }
                {
                    actionLabel && onAction &&
                    <Button
                        label={actionLabel || ""}
                        small
                        onClick={handleOnClick}
                        {...{ disabled }}
                    />
                }
            </div>
        </div>
    )
}

export default ProductCard