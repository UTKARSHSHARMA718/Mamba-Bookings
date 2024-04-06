
import React from 'react';

import ListingHeadingAndImage from '@/containers/ListingHeadingAndImage/ListingHeadingAndImage';
import ListingInfo from '@/containers/ListingInfo/ListingInfo';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getListing } from '@/actions/getListing';
import EmptyPage from '@/components/EmptyPage/EmptyPage';

type ListingPageProps = {
    params: {
        listingId: string;
    }
}

const ListingPage: React.FC<ListingPageProps> = async ({ params }) => {
    const { listingId } = params;
    const user = await getCurrentUser();
    const listingDetails = await getListing({ listingId });

    if (!listingDetails) {
        return <EmptyPage
            title='Something went wrong'
            description='Please try again after some time, sorry for this mishappening'
        />
    }


    return (
        <div>
            <ListingHeadingAndImage
                currentUser={user}
                listingData={listingDetails}
            />
            <ListingInfo reservations={listingDetails?.reservations} currentUser={user}
                listingData={listingDetails} />
        </div>
    )
}

export default ListingPage