
import React from 'react';

import ListingHeadingAndImage from '@/containers/ListingHeadingAndImage/ListingHeadingAndImage';
import ListingInfo from '@/containers/ListingInfo/ListingInfo';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListing } from '@/actions/getListing';

type ListingPageProps = {
    params: {
        listingId: string;
    }
}

const ListingPage: React.FC<ListingPageProps> = async ({ params }) => {
    const { listingId } = params;
    const user = await getCurrentUser();
    const listingDetails = await getListing({ listingId });

    return (
        <div>
            <ListingHeadingAndImage 
                currentUser={user} 
                listingData={listingDetails} 
            />
            <ListingInfo />
        </div>
    )
}

export default ListingPage