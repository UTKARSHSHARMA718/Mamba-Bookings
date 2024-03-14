import Avatar from '@/components/Avatar/Avatar';
import { Listing, User } from '@prisma/client'
import React from 'react'

type ListingInfoTypes = {
    currentUser: User,
    data: Listing,
}

const ListingInfo: React.FC<ListingInfoTypes> = ({
    currentUser,
    data,
}) => {

    const { guestsCount, bathroomsCount, roomsCount, } = data;

    const {
        id,
        name,
        email,
        hashsedPassword,
        image,
    } = currentUser;


    return (
        <div>
            <div className={`
                flex
                flex-col

                `}>
                <div className={`
                flex
                flex-col
                gap-2
                items-center
                justify-between
                `}>
                    <div>
                        <p className='font-bold text-sm'>Hosted by {name}</p>
                    </div>
                    <Avatar />
                </div>

                <div className={`
                    flex
                    gap-1
                    justify-between
                    items-center
                    `}
                >
                    <p className='text-xs text-slate-300'>guest {guestsCount}</p>
                    <p className='text-xs text-slate-300'>bathrooms {bathroomsCount}</p>
                    <p className='text-xs text-slate-300'>rooms {roomsCount}</p>
                </div>
            </div>
        </div>
    )
}

export default ListingInfo