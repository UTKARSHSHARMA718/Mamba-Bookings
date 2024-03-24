import React from 'react'

import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

type CounterType = {
    label: string;
    value: number;
    onAdd: () => void;
    onSub: () => void;
    isAddDisabled: boolean;
    isSubDisabled: boolean;
}

const Counter: React.FC<CounterType> = ({
    label,
    onAdd,
    onSub,
    value,
    isAddDisabled,
    isSubDisabled,
}) => {
    const disableStyles = 'opacity-60 cursor-not-allowed'

    return (
        <div
            className='bg-slate-100 dark:bg-slate-900 border-[1px] border-slate-200 rounded-xl flex flex-col md:flex-row justify-between p-2 gap-8'>
            <div className='flex justify-center items-center'>
                <p className='text-sm font-bold'>{label}</p>
            </div>
            <div className='flex justify-between items-center gap-6 md:justify-center'>
                <AiOutlineMinusCircle onClick={isSubDisabled ? () => { } : onSub} size={24} className={`cursor-pointer hover:opacity-70 ${isSubDisabled ? disableStyles : ''}`} />
                <div className='min-w-[40px] min-h-[40px] flex justify-center items-center'>
                    <p >
                        {value}
                    </p>
                </div>
                <AiOutlinePlusCircle
                    onClick={isAddDisabled ? () => { } : onAdd} size={24}
                    className={`cursor-pointer hover:opacity-70 ${isAddDisabled ? disableStyles : ''}`} />
            </div>
        </div>
    )
}

export default Counter