'use client'

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import Heading from '@/components/Headers/Heading';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Reservation } from '@prisma/client'
import { API, RESERVATIONS } from '@/constants/apiEndpoints';
import { GENERAL_ERROR_MESSAGE } from '@/constants/errorMessage';
import { RESERVATION_DELETED_MESSAGE } from '@/constants/generalMessage';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';

type TripsClintTypes = {
    reservations: Reservation[];
    currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClintTypes> = ({
    reservations,
    currentUser,
}) => {
    const [isDeletingUser, setIsDeletingUser] = useState("");
    const router = useRouter();

    //api call
    const deleteTripHandler = useCallback(async (id: string) => {
        setIsDeletingUser(id);
        try {
            const url = `${API}${RESERVATIONS}/${id}`;
            const res = await axios.delete(url);
            if (res?.data?.ok) {
                toast.success(RESERVATION_DELETED_MESSAGE)
                router.refresh();
                return;
            }
            toast.error(GENERAL_ERROR_MESSAGE);
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        } finally {
            setIsDeletingUser("");
        }
    }, [axios, setIsDeletingUser, toast])

    return (
        <div>
            <Heading
                heading="Trips"
                subHeading="Where you've been and where are you going"
            />
            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-4
            ">
                {
                    reservations?.map(reservation => {
                        return <ProductCard
                            {...{ reservation }}
                            onAction={deleteTripHandler}
                            actionLabel="Delete Trip"
                            imgSrc={reservation?.listing?.imageSrc}
                            key={reservation?.id}
                            currentUser={currentUser}
                            price={reservation?.totalPrice}
                            disabled={isDeletingUser === reservation?.id}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default TripsClient