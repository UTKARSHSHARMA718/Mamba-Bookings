import React from 'react';
import { redirect } from 'next/navigation';

import EmptyPage from '@/components/EmptyPage/EmptyPage';
import ReservationsListing from '@/containers/ReservationsListing/ReservationsListing';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getReservations } from '@/actions/getReservations';
import { HOME } from '@/constants/routeNames';

const Reservations = async () => {
    const user = await getCurrentUser();
    const allReservationsOfUser = await getReservations({ authorId: user?.id });

    // if (!user) {
    //     redirect(HOME)
    // }

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