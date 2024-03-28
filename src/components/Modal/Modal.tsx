'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';

import Button from '../Button/Button';
import { ModalProps } from '@/types/Modal/ModalTypes'

const Modal: React.FC<ModalProps> = ({
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    isOpen,
    footer,
}) => {
    const [showModal, setShowModal] = useState(!!isOpen);

    const handleOnSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        const timer = setTimeout(() => {
            onSubmit();
        }, 300)

        return () => {
            clearTimeout(timer);
        }
    }, [disabled, onSubmit]);

    const handleOnClose = useCallback(() => {

        onClose && onClose();
    }, [disabled, onClose]);

    const handleSecoundaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    useEffect(() => {
        setShowModal(!!isOpen)
    }, [isOpen])

    return (
        <>
            {isOpen ?
                <div className='
                    z-50
                    overflow-x-hidden
                    overflow-y-auto
                    bg-neutral-800/70
                    fixed
                    inset-0
                    outline-none
                    focus:outline-none
                    flex
                    justify-center
                    items-center
                '>
                    <div className="
                    relative
                    flex
                    justify-center
                    items-center 
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    mx-auto 
                    h-full 
                    lg:h-auto
                    md:h-auto
                    w-11/12
                    md:w-full
                    ">
                        {/* Container */}
                        <div
                            style={{ zIndex: "9999999" }}
                            className={`
                            flex
                            flex-col
                            justify-between
                            items-center
                            gap-2
                            bg-white
                            dark:bg-slate-900
                            rounded-lg
                            p-0
                            md:p-2
                            max-h-[800px]
                            max-w-[500px]
                            min-w-[250px]
                            transition
                            duration-300
                            w-full
                            ${showModal ? "translate-y-0" : "translate-y-full"}
                            ${showModal ? "opacity-100" : "opacity-0"}
                        `}>

                            {/* Header */}
                            <div className="
                            w-full
                            border-b-[1px]
                            min-h-[32px]
                            flex
                            p-2
                            flex-row-reverse
                            justify-between
                            items-center
                        ">
                                <button className="
                                flex
                                justify-between
                                items-center
                                p-2
                                rounded-md
                                bg-white
                                dark:bg-slate-900
                                relative
                            ">
                                    <IoMdClose onClick={handleOnClose} size={18} className='
                                    transition
                                    duration-200
                                    text-black
                                    hover:text-gray-700
                                    cursor-pointer
                                    dark:bg-slate-900
                                    dark:text-white
                                    '/>

                                </button>

                                {/* Title */}
                                <div className='
                            text-md
                            text-center
                            font-semibold
                            w-full
                            '>
                                    {title}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="relative p-4 md:p-6 flex-auto w-full">
                                {body}
                            </div>

                            {/* Footer */}
                            <div className="
                            flex 
                            flex-col
                            gap-2
                            p-2
                            w-full
                            border-t-[1px]
                         ">
                                <div className="flex gap-2">
                                    {secondaryActionLabel && secondaryAction &&
                                        <Button
                                            outline
                                            label={secondaryActionLabel}
                                            onClick={handleSecoundaryAction}
                                            {...{ disabled }}
                                        />}
                                    {!!actionLabel && handleOnSubmit &&
                                        <Button
                                            label={actionLabel}
                                            onClick={handleOnSubmit}
                                            {...{ disabled }}
                                        />}
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div> :
                null
            }
        </>
    )
}

export default Modal