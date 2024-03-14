'use client'

import React, { useState } from 'react'

import { InputProps } from '@/types/Input/Input';
import { BiDollar } from "react-icons/bi";

const Input: React.FC<InputProps> = ({
    id,
    label,
    errors,
    disabled,
    register,
    required,
    type = 'text',
    isPriceInput,
}) => {


    return (
        <div className='relative'>
            {/* TODO: absolute  */}
            <label className={`
                        font-medium
                        left-3
                        transition
                        duration-300
                        text-[12px]
                       
                    `}>
                {label}
            </label>
            <div className='flex justify-between'>
                {isPriceInput &&
                    <span className=
                    'py-1 px-3 border-slate-200 border-[1px] rounded-lg flex justify-center items-center rounded-br-none rounded-tr-none'>
                        <BiDollar size={20} />
                    </span>
                }
                <input
                    {...{ id, type, disabled }}
                    placeholder=" "
                    {...register(id, { required })}
                    className={`
                    peer
                    text-lg
                    rounded-lg
                    p-3
                    font-medium
                    w-full
                    border-[1px]
                    outline-slate-300
                    ${errors?.[id] ? 'border-primary-red' : 'border-slate-200'}
                    ${errors?.[id] ? 'text-primary-red' : 'text-black'}
                    ${isPriceInput ? 'rounded-tl-none rounded-bl-none' : ''}
                    
                    `}
                />
            </div>
        </div>
    )
}

export default Input