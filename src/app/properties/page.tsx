import React from 'react';

import EmptyPage from '@/components/EmptyPage/EmptyPage';
import MainProductListing from '@/containers/MainProductListing/MainProductListing'
import { getAllListing } from '@/actions/getAllListings';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Properties = async () => {
    const user = await getCurrentUser();
    const allListings = await getAllListing({
        userId: user?.id || "",
    });

    if (!user) {
        return <EmptyPage
            title='Not Authorized!'
            description='Please login to see your properties.'
        />
    }

    return (
        <div>
            <MainProductListing
                {...{ user }}
                allListings={allListings || []}
            />
        </div>
    )
}

export default Properties