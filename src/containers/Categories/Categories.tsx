'use client'

import React from 'react';

import CategoryBox from '../CategoryBox/CategoryBox'
import { CATEGORIES, categoriesToRender } from '@/constants/const';
import { useSearchParams } from 'next/navigation';


const Categories = () => {
    const params = useSearchParams();
    let categoriesNames = params.get(CATEGORIES) || "";
    categoriesNames = categoriesNames?.split(",") as string;

    return (
        <div className='flex gap-2 justify-between items-center p-2 overflow-x-auto w-full'
            style={{ overflowX: "auto" }}
        >
            {
                categoriesToRender?.map((item, index) => {
                    return <CategoryBox key={index} label={item?.label} icon={item?.icon} isSelected={categoriesNames.includes(item?.label)} description={item?.description} />
                })
            }
        </div>
    )
}

export default Categories