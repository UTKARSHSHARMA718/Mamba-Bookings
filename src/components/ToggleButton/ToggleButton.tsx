'use client'

import React, { useCallback, useState } from 'react'
import { IconType } from 'react-icons';

type ToggleButtonProps = {
    label?: string;
    onTurnOn: () => void;
    onTurnOFF: () => void;
    turnOnIcon?: IconType,
    turnOFFIcon?: IconType,
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    label,
    onTurnOFF,
    onTurnOn,
    turnOnIcon: TurnOnIcon,
    turnOFFIcon: TurnOffIcon,
}) => {
    const [buttonOnOff, setButtonOnOff] = useState(false);

    const toggleHandler = useCallback(() => {
        if (buttonOnOff) {
            setButtonOnOff(false);
            onTurnOFF();
            return;
        }
        setButtonOnOff(true);
        onTurnOn();
    }, [onTurnOFF, onTurnOn, buttonOnOff]);

    return (
        <div className='flex justify-center items-center flex-col w-[60px] gap-1'>
            <div onClick={toggleHandler} className={`relative bg-slate-400 w-full border-[1px] cursor-pointer min-h-[30px] min-w-[30px] p-1 rounded-xl border-slate-200 hover:shadow-md flex ${buttonOnOff ? "justify-end" : "justify-start"} transition duration-300`}>
                <div className='min-w-[20px] min-h-[20px] rounded-full bg-slate-100 border-slate-200 border-[1px] transition duration-300'></div>
                {!!TurnOnIcon && buttonOnOff && <TurnOnIcon size={20} className='absolute left-1' />}
                {!!TurnOffIcon && !buttonOnOff && <TurnOffIcon size={20} className='absolute right-1' />}
            </div>
            {!!label && <p className='text-xs font-semibold'>{label}</p>}
        </div>
    )
}

export default ToggleButton