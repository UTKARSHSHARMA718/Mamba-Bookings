'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';

import CategoryBox from '../CategoryBox/CategoryBox'
import useQueryParams from '@/hooks/useQueryParams';
import { CATEGORIES, categoriesToRender } from '@/constants/const';
import { compareString } from '@/libs/utils/util';


const Categories = () => {
    const params = useSearchParams();
    const { setQueryParams, removeQuery } = useQueryParams();
    let categoriesNames: string[] = params?.get(CATEGORIES)?.split(",") || [];

    const onCategoryClickHandler = (labelValue: string) => {
        let value = categoriesNames;
        if (!value?.includes(labelValue)) {
            value?.push(labelValue);
        } else {
            value = value?.filter(v => !compareString(v, labelValue))
        }

        if (value?.length) {
            setQueryParams({
                queryName: CATEGORIES,
                value: value?.join(","),
            })
            return;
        }

        removeQuery({ key: CATEGORIES })
    }

    return (
        <div className='flex gap-2 justify-between items-center p-2 overflow-x-auto w-full'
            style={{ overflowX: "auto" }}
        >
            {
                categoriesToRender?.map((item, index) => {
                    return <CategoryBox
                        key={index}
                        label={item?.label}
                        icon={item?.icon}
                        isSelected={categoriesNames.includes(item?.label)}
                        description={item?.description}
                        onClick={() => onCategoryClickHandler(item?.label)}
                    />
                })
            }
        </div>
    )
}

export default Categories