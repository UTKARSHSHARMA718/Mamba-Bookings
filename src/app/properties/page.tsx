import React from 'react';

import EmptyPage from '@/components/EmptyPage/EmptyPage';
import MainProductListing from '@/containers/MainProductListing/MainProductListing'
import { getAllListing } from '@/actions/getAllListings';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Properties = async () => {
    const user = await getCurrentUser();
    const listingRes = await getAllListing({
        userId: user?.id || "",
    });
    const listings = listingRes?.data;

    if (!user) {
        return <EmptyPage
            title='Not Authorized!'
            description='Please login to see your properties.'
        />
    }

    if (!listings || !listings?.length) {
        return <EmptyPage
            title='No listing to show!'
            description='Please add some properties to see them here.'
        />
    }

    return (
        <MainProductListing
            {...{ user }}
            allListings={listings || []}
            totalListings={listings.length}
            isDeleteOptionAvailable
        />
    )
}

export default Properties