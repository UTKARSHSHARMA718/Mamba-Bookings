import { DARK } from '@/constants/const';
import { useTheme } from 'next-themes';
import React from 'react'
import { IconType } from 'react-icons';

type CategoryType = {
    icon: IconType;
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const CategoryInput: React.FC<CategoryType> =
    ({ icon: Icon, label, isSelected, onClick = () => { } }) => {
        const { theme } = useTheme();
        const isDarkTheme = theme === DARK;
        const isSelectedStyles = (isDarkTheme ? !isSelected : isSelected) ? 'border-black' : 'border-slate-200';

        return (
            <div
                {...{ onClick }}
                className={`flex flex-col cursor-pointer gap-4 p-2 justify-start border-[1px] ${isSelectedStyles} rounded-lg`}>
                <Icon size={24} />
                <div>
                    <p className='text-xs'>{label}</p>
                </div>
            </div>
        )
    }

export default CategoryInput