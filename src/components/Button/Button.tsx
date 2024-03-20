import React from 'react'
import { IconType } from 'react-icons';

type ButtonProps = {
    label: string;
    small?: boolean;
    outline?: boolean;
    customStyles?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    small,
    outline,
    customStyles,
    onClick,
    disabled,
    icon: Icon,
}) => {

    return (
        <button className={`
            px-2
            flex
            gap-2
            items-center
            rounded-md
            w-full
            transition
            hover:opacity-90
            disabled:opacity-70
            disabled:cursor-not-allowed
            justify-center
            relative
            ${small ? 'text-xs' : 'text-sm'}
            ${small ? 'py-1' : 'py-2'}
            ${small ? 'font-medium' : 'font-semibold'}
            ${outline ? 'bg-white' : 'bg-primary-green-2'}
            ${outline ? 'border-[1px]' : 'border-0'}
            ${outline ? 'text-black' : 'text-white'}
            ${customStyles}
        `}
            {...{ onClick, disabled }}
        >
            {Icon && <Icon size={24} className='absolute left-2' />}
            {label}
        </button>
    )
}

export default Button