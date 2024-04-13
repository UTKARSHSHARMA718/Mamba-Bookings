'use client'

import React, { useCallback } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

import GridView from '@/components/GridView/GridView';
import ProductCard from '@/components/ProductCard/ProductCard';
import { CompleteReservationDataType, SafeUser } from '@/types/DataBaseModes/DataBaseModes'

import { API, TRIPS } from '@/constants/apiEndpoints';
import { useRouter } from 'next/navigation';
// TODO: change any type later
type TripsListingProps = {
    user:any;
    trips: any,
}

const TripsListing: React.FC<TripsListingProps> = ({
    user,
    trips,
}) => {
    const router = useRouter();

    const cancelTrips = useCallback(async ({ tripId }: { tripId: string }) => {
        try {
            const url = `${API}${TRIPS}/${tripId}`;
            const res = await axios?.delete(url)
            if (res?.data?.ok) {
                toast.success("Trip has been successfully deleted!");
                router?.refresh();
                return;
            }
            toast.error("Something went wrong!");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err);
        }
    }, [toast, axios])

    return (
        <GridView>
            <>
                {
                    trips?.map(trip => {
                        return <ProductCard
                            key={trip?.id}
                            currentUser={user}
                            imgSrc={trip?.listing?.imageSrc}
                            listingId={trip?.listing?.id}
                            price={trip?.totalPrice}
                            actionLabel="Cancel Trip"
                            onAction={() => cancelTrips({ tripId: trip?.id })}
                            locationValue={trip?.listing?.locationValue}
                            reservation={trip}
                            category={trip?.listing?.category}
                        />
                    })
                }
            </>
        </GridView>
    )
}

export default TripsListing