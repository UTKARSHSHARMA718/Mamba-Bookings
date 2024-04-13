'use client'

import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import Input from '../Input/Input';

type PasswordInputProps = {
    id: string;
    isLoading?: boolean,
    label?: string,
    register?: UseFormRegister<FieldValues>;
    errors?: FieldErrors<FieldValues>,
    isRequired?: boolean,
    onChange?: (v:string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    id,
    isLoading,
    label = "Password",
    register,
    errors,
    isRequired,
    onChange,
}) => {
    const eyeIconStyles = 'absolute right-2 top-[16px] z-20 cursor-pointer bg-white';
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleToggle = () => setIsShowPassword(prev => !prev);

    return (
        <div className='relative'>
            <div onClick={handleToggle}>
                {isShowPassword ?
                    <FaRegEye size={20} className={eyeIconStyles} /> :
                    <FaEyeSlash size={20} className={eyeIconStyles} />
                }
            </div>
            <Input
                disabled={isLoading}
                type={isShowPassword ? 'text' : 'password'}
                {...{ register, errors, label, id, onChange }}
                required={isRequired}
            />
        </div>
    )
}

export default PasswordInput