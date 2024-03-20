import React from 'react'
import { IconType } from 'react-icons';

import { RENT_MODAL_DATA, SELECTED_CATEGORY } from '@/constants/const';
import useLocalStoarge from '@/hooks/useLocalStorage';
import { RENT_MODAL_DATA_STRUCTURE } from '../../constants/const';


type CategoryType = {
    icon: IconType;
    label: string;
    isSelected: boolean;
    onClick: () => void;
}

const CategoryInput: React.FC<CategoryType> =
    ({ icon: Icon, label, isSelected, onClick = () => { } }) => {
        const isSelectedStyles = isSelected ? 'border-black' : 'border-slate-200';

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