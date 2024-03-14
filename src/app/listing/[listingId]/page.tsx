import ListingHeadingAndImage from '@/containers/ListingHeadingAndImage/ListingHeadingAndImage';
import ListingInfo from '@/containers/ListingInfo/ListingInfo';
import React from 'react'
import { encryptData } from '@/libs/utils/EncryptionLayer';

type ListingPageTypes = {
    listingId: string;
}

const ListingPage = ({ params }: { params: ListingPageTypes }) => {
    const listingId = params?.listingId;
    // TODO: get original data from server actions
    const dummyData = {
        title:"Villa in Sweden, Countryside",
        description:"Europe, Sweden",
        imageSrc:"https://res.cloudinary.com/ddnf8x3zb/image/upload/v1710326629/xtjbucekgvwo6o4jw9tf.jpg",
        guestsCount:2,
        bathroomsCount:2,
        roomsCount:2,
    }

    const currentUser = {
        id :1,
        name:"Nihil",
        email:"utkarsh.sharma@gmail.com",
        hashsedPassword:"wwdwfd",
        image: dummyData?.imageSrc,
    }

    return (
        <div>
            <ListingHeadingAndImage data={dummyData}/>
            <ListingInfo data={dummyData} currentUser={currentUser}/>
        </div>
    )
}

export default ListingPage