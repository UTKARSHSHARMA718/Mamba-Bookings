import React from 'react';

import EmptyPage from '@/components/EmptyPage/EmptyPage';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getReservations } from '@/actions/getReservations';
import ReservationsListing from '@/containers/ReservationsListing/ReservationsListing';

const Reservations = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return <EmptyPage
            title='You are not authorized'
            description='Please login to the website!'
        />
    }

    const allReservationsOfUser = await getReservations({ userId: user?.id });

    if (!allReservationsOfUser || !allReservationsOfUser?.length) {
        return <EmptyPage
            title='Look you like have no reservation.'
            description='Please have some reservations to see them here!'
        />
    }



    return (
        <ReservationsListing
            {...{ user, allReservationsOfUser }}
        />
    )
}

export default Reservations