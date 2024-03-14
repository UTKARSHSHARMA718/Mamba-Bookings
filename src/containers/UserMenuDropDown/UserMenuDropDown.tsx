import React from 'react';

import MenuItem from '@/components/ManuItem/MenuItem';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { COMPANY_NAME } from '@/constants/const';
import { signOut } from 'next-auth/react';
import useRentModal from '@/hooks/useRentModal';

const UserMenuDropDown = React.forwardRef((props, ref: React.ForwardedRef<unknown>) => {
    const isUserLoggedIn = false;
    const registerModalProperties = useRegisterModal();
    const rentModal=useRentModal();
    const loginModalProperties = useLoginModal();
    const menuItemsForNonLoggedInUser: { text: string; onClick: () => void }[] =
        [
            { text: 'Login', onClick: loginModalProperties.onOpen },
            { text: 'SignUp', onClick: registerModalProperties.onOpen },
        ]
    const menuItemForLoggedInUser: { text: string; onClick: () => void }[] =
        [
            {
                text: 'My trips',
                onClick: () => { },
            },
            {
                text: 'My favorites',
                onClick: () => { },
            },
            {
                text: 'My reservations',
                onClick: () => { },
            },
            {
                text: 'My properties',
                onClick: () => { },
            },
            {
                text: `${COMPANY_NAME} my home`,
                onClick: () => rentModal?.onOpen(),
            },
            {
                text: 'Logout',
                onClick: () => signOut(),
            },
        ];

    const menuList = isUserLoggedIn ? menuItemForLoggedInUser : menuItemsForNonLoggedInUser;

    return (
        // TODO: fix this later
        <div ref={ref} className='
            absolute
            top-4 
            right-0 
            bg-black
            rounded-xl 
            flex 
            flex-col 
            gap-2 
            shadow-md 
            w-[10vw] 
            md:w-3/4 
            overflow-hidden 
            text-sm
            p-2
            '
            onClick={e=>e?.stopPropagation()}
            // TODO: remove it later after fixing the styles issue in tailwind
            style={{
                position: 'absolute', top: "40px", right: "-16px", flexDirection: "column",
                backgroundColor: "#E5E5E5", borderRadius: '12px',
                padding: "8px 0xp",
                overflow: "hidden",
                width: "12vw",
                transition: "all 0.5s ease",
                minWidth: "130px"
            }}
        >
            {menuList?.map((item, index) => {
                return <MenuItem label={item?.text} onClick={item?.onClick} key={index} />
            })}
        </div>
    )
})

export default UserMenuDropDown