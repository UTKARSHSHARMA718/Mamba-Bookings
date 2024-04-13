import React from 'react'

import TripsListing from '@/containers/TripsListing/TripsListing';
import EmptyPage from '@/components/EmptyPage/EmptyPage';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getReservations } from '@/actions/getReservations';

const Trips = async () => {
    // TODO: I'm repeating my-self on main pages, please make a single page for all the different page later once project is ready to deploy
    const user = await getCurrentUser();
    const trips = await getReservations({ userId: user?.id })||[]

    // if (!user) {
    //     redirect(HOME)
    // }
    if (!trips || !trips?.length) {
        return <EmptyPage
            title='No trips found!'
            description='Please add some trips to see them here.'
        />
    }

    return (
        <TripsListing {...{ user, trips }} />
    )
}

export default Trips