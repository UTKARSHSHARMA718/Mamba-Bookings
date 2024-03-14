import { SELECTED_CATEGORY } from '@/constants/const';
import useQueryParams from '@/hooks/useQueryParams';
import React from 'react'
import { IconType } from 'react-icons';

type CategoryType = {
    icon: IconType;
    label: string;
    isSelected: boolean;
    setSelectedCategory: (v: string) => void;
    selectedCategory: string;
}

const CategoryInput: React.FC<CategoryType> =
    ({ icon: Icon, label, isSelected, setSelectedCategory, selectedCategory }) => {
        const { handleClick } = useQueryParams({ isMultiSelect: false });
        const isSelectedStyles = isSelected ? 'border-black' : 'border-slate-200';

        const handleOnCategorySelect = () => {
            handleClick(label, SELECTED_CATEGORY);
            if (selectedCategory === label) {
                setSelectedCategory("");
                return;
            }
            setSelectedCategory(label);

        }

        return (
            <div
                onClick={handleOnCategorySelect}
                className={`flex flex-col cursor-pointer gap-4 p-2 justify-start border-[1px] ${isSelectedStyles} rounded-lg`}>
                <Icon size={24} />
                <div>
                    <p className='text-xs'>{label}</p>
                </div>
            </div>
        )
    }

export default CategoryInput