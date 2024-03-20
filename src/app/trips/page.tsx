import { getCurrentUser } from '@/actions/getCurrentUser';
import { getFavouriteListing } from '@/actions/getFavouriteListings';
import EmptyPage from '@/components/EmptyPage/EmptyPage';
import React from 'react'

const Trips = async() => {

    // TODO: I'm repeating my-self on main pages, please make a single page for all the different page later once project is ready to deployed
    const allfavoriteListings = await getFavouriteListing();
    const user = await getCurrentUser();

    if (!user) {
        return <EmptyPage
            title='Not Authorized!'
            description='Please login to see your favourite marked items.'
        />
    }

    if (!allfavoriteListings || !allfavoriteListings?.length) {
        return <EmptyPage
            title='No favorite listing found!'
            description='Please add some listing to favourite to see them here.'
        />
    }

    return (
        <div>Trips</div>
    )
}

export default Trips