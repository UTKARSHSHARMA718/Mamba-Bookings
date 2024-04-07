'use client'

import React from 'react'
import { BiDollar } from "react-icons/bi";

import { InputProps } from '@/types/Input/Input';
import styles from "./Input.module.css";

const Input: React.FC<InputProps> = ({
    id,
    label,
    errors,
    disabled,
    register,
    required,
    type = 'text',
    isPriceInput,
    onChange,
    value
}) => {

    return (
        <div className='relative'>
            <div className="
                    flex 
                    justify-between
                ">
                {isPriceInput &&
                    <span className="
                        py-1 
                        px-3 
                        border-slate-200 
                        border-[1px] 
                        rounded-lg 
                        flex 
                        justify-center 
                        items-center 
                        rounded-br-none 
                        rounded-tr-none
                        "
                    >
                        <BiDollar size={20} />
                    </span>
                }
                <input
                    min={type === 'password' ? 8 : 3}
                    max={type === 'password' ? 16 : 100000000}
                    //@ts-ignore
                    {...(register?.(id, { required }) || {})}
                    {...{ id, type, disabled, value }}
                    onChange={e => onChange?.(e?.target?.value as string)}
                    placeholder=" "
                    className={`
                    ${styles.inputField}
                    text-lg
                    rounded-lg
                    p-3
                    font-medium
                    w-full
                    border-[1px]
                    outline-slate-300
                    dark:text-white
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    ${errors?.[id] ? 'border-primary-red' : 'border-slate-200'}
                    ${errors?.[id] ? 'text-primary-red' : 'text-black'}
                    ${isPriceInput ? 'rounded-tl-none rounded-bl-none' : ''}
                    `}
                />
                <label className={`
                        ${styles.inputLabel}
                        absolute 
                        left-4
                        top-0
                        font-medium
                        transition
                        duration-300
                        text-slate-400
                    `}>
                    {label}
                </label>
            </div>
        </div>
    )
}

export default Input