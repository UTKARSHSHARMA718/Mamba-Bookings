import React from 'react'

import EmptyPage from '@/components/EmptyPage/EmptyPage'
import Heading from '@/components/Headers/Heading';
import MainProductListing from '@/containers/MainProductListing/MainProductListing';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getFavouriteListing } from '@/actions/getFavouriteListings'
import { PAGE_SIZE } from '@/constants/const';

const Favoutrite = async () => {

    const allfavoriteListings = await getFavouriteListing({
        pageSize: PAGE_SIZE,
        pageNumber: 1,
    });
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
        <div className='p-4 flex flex-col gap-4'>
            <Heading
                heading='Favorites'
                subHeading='Here you can find all of your favourite marked lisitng items.'
                isHeadingCenter
                isSubHeadingCenter
            />
            <MainProductListing
                allListings={allfavoriteListings}
                totalListings={allfavoriteListings?.length}
                {...{ user }}
            />
        </div>
    )
}

export default Favoutrite