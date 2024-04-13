'use client'

import React, { useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

import MenuItem from '@/components/ManuItem/MenuItem';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useUserDropdown from '@/hooks/useUserDropdown';
import { COMPANY_NAME, DARK } from '@/constants/const';
import { FAVORITES, HOME, PROPERTIES, RESERVATIONS, TRIPS } from '@/constants/routeNames';

type UserMenuDropDownTypes = {
    isUserLoggedIn: boolean;
    openRentModalHandler: () => void;
}

const UserMenuDropDown: React.FC<UserMenuDropDownTypes> = React.forwardRef(({ isUserLoggedIn, openRentModalHandler }, ref: React.ForwardedRef<unknown>) => {
    const router = useRouter();
    const { theme } = useTheme();
    const isDarkTheme = theme === DARK;

    const registerModalProperties = useRegisterModal();
    const loginModalProperties = useLoginModal();
    const userUserMenuDropDown = useUserDropdown();

    const onOptionClick = (callback: () => void) => {
        callback?.();
        userUserMenuDropDown?.onClose();
    }

    const handleLogout = useCallback(() => {
        signOut?.();
        router?.refresh();
    }, [router, signOut])

    const menuItemsForNonLoggedInUser: { text: string; onClick: () => void }[] =
        [
            { text: 'Login', onClick: () => onOptionClick(loginModalProperties.onOpen) },
            { text: 'SignUp', onClick: () => onOptionClick(registerModalProperties.onOpen) },
        ]
    const menuItemForLoggedInUser: { text: string; onClick: () => void }[] =
        [
            {
                text: 'Home',
                onClick: () => router?.push(HOME),
            },
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
                onClick: openRentModalHandler,
            },
            {
                text: 'Logout',
                onClick: handleLogout,
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
            dark:bg-white
            rounded-xl 
            flex 
            flex-col
            items-start 
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
                backgroundColor: (isDarkTheme ? "black" : "#E5E5E5"), borderRadius: '12px',
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
                    return <React.Fragment key={index}>
                        <div style={{ width: "100%", minHeight: "1px", backgroundColor: "grey" }}>
                        </div>
                        <MenuItem label={item?.text} onClick={item?.onClick} customStyles='border-[1px] border-slate-400 text-center w-full' />
                    </React.Fragment>
                }
                return <MenuItem label={item?.text} onClick={item?.onClick} key={index} customStyles='w-full text-start'/>
            })}
        </div>
    )
})

export default UserMenuDropDown