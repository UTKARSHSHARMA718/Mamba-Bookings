'use client'

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import MenuItem from '@/components/ManuItem/MenuItem';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useRentModal from '@/hooks/useRentModal';
import useUserDropdown from '@/hooks/useUserDropdown';
import { COMPANY_NAME } from '@/constants/const';
import { FAVORITES, PROPERTIES, RESERVATIONS, TRIPS } from '@/constants/routeNames';

type UserMenuDropDownTypes = {
    isUserLoggedIn: boolean;
}

const UserMenuDropDown: React.FC<UserMenuDropDownTypes> = React.forwardRef(({ isUserLoggedIn }, ref: React.ForwardedRef<unknown>) => {
    const router = useRouter();

    const registerModalProperties = useRegisterModal();
    const rentModal = useRentModal();
    const loginModalProperties = useLoginModal();
    const userUserMenuDropDown = useUserDropdown();

    const onOptionClick = (callback: () => void) => {
        callback?.();
        userUserMenuDropDown?.onClose();
    }

    const menuItemsForNonLoggedInUser: { text: string; onClick: () => void }[] =
        [
            { text: 'Login', onClick: () => onOptionClick(loginModalProperties.onOpen) },
            { text: 'SignUp', onClick: () => onOptionClick(registerModalProperties.onOpen) },
        ]
    const menuItemForLoggedInUser: { text: string; onClick: () => void }[] =
        [
            {
                text: 'My trips',
                onClick: () => router?.push(TRIPS),
            },
            {
                text: 'My favorites',
                onClick: () => router?.push(FAVORITES),
            },
            {
                text: 'My reservations',
                onClick: () => router?.push(RESERVATIONS),
            },
            {
                text: 'My properties',
                onClick: () => router?.push(PROPERTIES),
            },
            {
                text: `Add my home to ${COMPANY_NAME}`,
                onClick: rentModal?.onOpen,
            },
            {
                text: 'Logout',
                onClick: () => signOut(),
            },
        ];

    const menuList = isUserLoggedIn ? menuItemForLoggedInUser : menuItemsForNonLoggedInUser;

    return (
        // TODO: fix this later
        // @ts-ignore
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
            onClick={e => e?.stopPropagation()}
            // TODO: remove it later after fixing the styles issue in tailwind
            style={{
                position: 'absolute', top: "40px", right: "0px", flexDirection: "column",
                backgroundColor: "#E5E5E5", borderRadius: '12px',
                padding: "8px 0xp",
                overflow: "hidden",
                width: "25vw",
                transition: "all 0.5s ease",
                minWidth: "150px",
                maxWidth: "200px",
                zIndex: "99",
            }}
        >
            {menuList?.map((item, index) => {
                if (item?.text === "Logout") {
                    return <>
                        <div style={{ width: "100%", minHeight: "1px", backgroundColor: "grey" }}>
                        </div>
                        <MenuItem label={item?.text} onClick={item?.onClick} key={index} customStyles='border-[1px] border-slate-400' />
                    </>
                }
                return <MenuItem label={item?.text} onClick={item?.onClick} key={index} />
            })}
        </div>
    )
})

export default UserMenuDropDown