'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';

// TODO: remove shimmer UI for ListingInfo component
import Avatar from '@/components/Avatar/Avatar';
import ListingReservations from '../ListingReservations/ListingReservations';
import useCountryInfo from '@/hooks/useCountryInfo';
import useLoginModal from '@/hooks/useLoginModal';
import { Listing, Reservation } from '@prisma/client'
import { compareString } from '@/libs/utils/util';
import { Resposnse } from '@/types/ApiResponse/ApiResponseTypes';
import { NEW_RESERVATIONS_CREATED_MESSAGE } from '@/constants/generalMessage';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import { GENERAL_ERROR_MESSAGE } from '@/constants/errorMessage';
import { categoriesToRender, initialDateRange } from '@/constants/const';
import { API, RESERVATIONS } from '@/constants/apiEndpoints';
import commonStyles from "@/common/styles/commonStyls.module.css";

const Map = dynamic(() => import('@/components/Map/Map'), {
    ssr: false
});

type ListingInfoTypes = {
    reservations?: Reservation[];
    currentUser: SafeUser | null;
    listingData: Listing | null;
}

const ListingInfo: React.FC<ListingInfoTypes> = ({ reservations, currentUser, listingData }) => {
    const router = useRouter();

    const { getCountryByValue } = useCountryInfo();
    const loginModal = useLoginModal();

    const disabledDates = useMemo(() => {
        let dateRange: Date[] = [];
        reservations?.forEach(v => {
            let range = eachDayOfInterval({
                start: new Date(v?.startDate),
                end: new Date(v?.endDate),
            })
            dateRange = [...range, ...dateRange];
        })
        return dateRange;
    }, [reservations])

    const [totalPrice, setTotalPrice] = useState(listingData?.price);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [isLoadingReservation, setIsLoadingReservation] = useState(false);

    const createNewReservation = useCallback(async () => {
        if (!currentUser) {
            loginModal?.onOpen();
            return;
        }
        setIsLoadingReservation(true);
        try {
            const url = `/${API}${RESERVATIONS}`;
            const payload = {
                totalPrice,
                startDate: dateRange?.startDate,
                endDate: dateRange?.endDate,
                listingId: listingData?.id,
            }
            const res: Resposnse = await axios.post(url, payload);
            if (res?.data?.ok) {
                toast?.success(NEW_RESERVATIONS_CREATED_MESSAGE);
                setDateRange(initialDateRange);
                router?.refresh();
                return;
            }
            toast?.error(GENERAL_ERROR_MESSAGE);
        } catch (err: any) {
            toast?.error(err?.message || err);
            console.log("Error while creating new reservation: " + err);
        } finally {
            setIsLoadingReservation(false);
        }
    }, [listingData?.id, dateRange, totalPrice, loginModal, toast])

    const category = useMemo(() => {
        return categoriesToRender?.find(item => compareString(item?.label, listingData?.category || ""));
    }, [listingData])

    const coordinates = useMemo(() => {
        return getCountryByValue(listingData?.locationValue || "")[0]?.latlgn || [0, 0];
    }, [listingData]);

    useEffect(() => {
        if (dateRange?.startDate && dateRange?.endDate) {
            const days = differenceInCalendarDays(dateRange?.endDate, dateRange?.startDate) + 1;
            if (listingData?.price && days) {
                setTotalPrice(listingData?.price * days);
            } else {
                setTotalPrice(listingData?.price);
            }
        }
    }, [dateRange?.endDate, dateRange?.startDate, listingData?.price])

    const Icon = category?.icon;

    const ShowCountProperties = ({ propertyNames, countValue }: { propertyNames: string, countValue: number }) => {
        return <p className='text-xs text-slate-300 font-medium'>{countValue} {propertyNames}</p>
    }

    return (
        <div className={`${commonStyles.container} p-6 flex-col md:flex-row flex gap-6 w-full m-auto`}>
            <div className='w-1/2 flex flex-col gap-6'>
                <div
                    style={{ maxWidth: "250px" }}
                    className='flex flex-col gap-4'>
                    <div className='flex gap-2 items-center justify-start'>
                        <div>
                            <p className='font-bold text-sm'>Hosted by {listingData?.user?.name}</p>
                        </div>
                        <Avatar />
                    </div>
                    <div className={`
                    flex
                    gap-1
                    justify-between
                    items-center
                    `}
                    >
                        <ShowCountProperties propertyNames='guests' countValue={listingData?.guestCount!} />
                        <ShowCountProperties propertyNames='bathrooms' countValue={listingData?.bathroomCount!} />
                        <ShowCountProperties propertyNames='rooms' countValue={listingData?.roomCount!} />
                    </div>
                </div>
                <hr />
                <div className='flex gap-4 justify-start items-center'>
                    <div className='flex justify-center items-center'>
                        {Icon && <Icon size={30} />}
                    </div>
                    <div className='flex flex-col gap-2 items-start justify-center'>
                        <p className='text-black font-semibold text-sm dark:text-white'>{category?.label}</p>
                        <p className='text-slate-300 fond-semibold text-xs'>{category?.description}</p>
                    </div>
                </div>
                <hr />
                <div>
                    <p className='font-medium text-sm'>{listingData?.description}</p>
                </div>
                <hr />
                <Map center={coordinates} />
            </div>
            <div className='w-1/2'>
                {/* TODO: change the component name to something more meaningful */}
                <ListingReservations
                    price={listingData?.price || 0}
                    totalPrice={totalPrice || 0}
                    dateRange={dateRange}
                    onSubmit={createNewReservation}
                    disabled={isLoadingReservation}
                    onDateChange={(value) => setDateRange(value)}
                    disabledDate={disabledDates}
                />
            </div>
        </div>
    )
}

export default ListingInfo