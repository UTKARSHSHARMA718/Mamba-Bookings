import React from 'react';

import Counter from '@/components/Counter/Counter';
import { MAX_BATHROOM_LIMIT, MAX_GUEST_LIMIT, MAX_ROOM_LIMIT, MIN_BATHROOM_LIMIT, MIN_GUEST_LIMIT, MIN_ROOM_LIMIT } from '@/constants/const'
import { SelectGuestRoomBathRoomCountProps } from '@/types/FilterScreens/FilterScreensTypes';
import Heading from '@/components/Headers/Heading';



const SelectGuestRoomBathRoomCount: React.FC<SelectGuestRoomBathRoomCountProps> = ({
    bathroomsCount,
    roomsCount,
    guestCount,
    setGuestCount,
    setRoomCount,
    setBathroomsCount
}) => {
    const counterData = [
        {
            label: "Bathroom",
            value: bathroomsCount,
            onAdd: () => setBathroomsCount((prev: number) => prev + 1),
            onSub: () => setBathroomsCount((prev: number) => prev - 1),
            isAddDisabled: bathroomsCount === MAX_BATHROOM_LIMIT,
            isSubDisabled: bathroomsCount === MIN_BATHROOM_LIMIT,
        },
        {
            label: "Room",
            value: roomsCount,
            onAdd: () => setRoomCount((prev: number) => prev + 1),
            onSub: () => setRoomCount((prev: number) => prev - 1),
            isAddDisabled: roomsCount === MAX_ROOM_LIMIT,
            isSubDisabled: roomsCount === MIN_ROOM_LIMIT,
        },
        {
            label: "Guest",
            value: guestCount,
            onAdd: () => setGuestCount((prev: number) => prev + 1),
            onSub: () => setGuestCount((prev: number) => prev - 1),
            isAddDisabled: guestCount === MAX_GUEST_LIMIT,
            isSubDisabled: guestCount === MIN_GUEST_LIMIT,
        },
    ]

    return (
        <>
            <Heading
                heading='More information?'
                subHeading='Find the perfect place!'
            />
            <div className="
                flex
                flex-col
                gap-2
                "
            >
                {counterData?.map(item => {
                    return <Counter
                        key={item?.label}
                        label={item?.label}
                        onAdd={item?.onAdd}
                        onSub={item?.onSub}
                        value={item?.value}
                        isAddDisabled={item?.isAddDisabled}
                        isSubDisabled={item?.isSubDisabled}
                    />
                })
                }
            </div>
        </>
    )
}

export default SelectGuestRoomBathRoomCount