'use client'

import React, { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import GridView from '@/components/GridView/GridView'
import ProductCard from '@/components/ProductCard/ProductCard'
import { API, RESERVATIONS } from '@/constants/apiEndpoints'
import { GENERAL_ERROR_MESSAGE } from '@/constants/errorMessage'
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes'
import { Listing, Reservation } from '@prisma/client'


type CompleteReservationDataType = {
    reservation: Omit<Reservation, "listing"> & {
        listing: Listing
    }
}

type ReservationsListingProps = {
    allReservationsOfUser: Array<CompleteReservationDataType>[],
    user: SafeUser,
}

const ReservationsListing: React.FC<ReservationsListingProps> = ({
    allReservationsOfUser,
    user,
}) => {
    const router = useRouter();

    const cancelReservationHandler = useCallback(async ({ reservationId }: { reservationId: string }) => {
        try {
            const url = API + RESERVATIONS + `/${reservationId}`;
            const res = await axios.delete(url);
            if (res?.data?.ok) {
                toast?.success("Reservation has been canceled successfully!");
                router?.refresh();
                return;
            }
            toast?.success(GENERAL_ERROR_MESSAGE);
        } catch (err: any) {
            toast?.error(err?.message);
        }
    }, [toast])

    return (
        <GridView>
            <>
                {
                    allReservationsOfUser?.map(reservation => {
                        return <ProductCard
                            currentUser={user}
                            imgSrc={reservation?.listing?.imageSrc}
                            listingId={reservation?.id}
                            price={reservation?.totalPrice}
                            actionLabel="Cancel reservation"
                            onAction={() => cancelReservationHandler({ reservationId: reservation?.id })}
                            locationValue={reservation?.listing?.locationValue}
                            reservation={reservation}
                            category={reservation?.listing?.category}
                        />
                    })
                }
            </>
        </GridView>
    )
}

export default ReservationsListing