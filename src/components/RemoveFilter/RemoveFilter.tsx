'use client'

import React from 'react'
import Button from '../Button/Button';
import useRemoveFilter from '@/hooks/useRemoveFilter';
import useQueryParams from '@/hooks/useQueryParams';
import { searchFilters } from '@/constants/const';

const RemoveFilter: React.FC<{}> = () => {
    const { isVisible, onHide } = useRemoveFilter();
    const { removeQuery } = useQueryParams();

    const btnClick = () => {
        onHide();
        removeQuery({ key: searchFilters });
    }

    return (
        <>
            {isVisible &&
                <div style={{ zIndex: "12" }} className="
            fixed
            w-full
            flex
            justify-center
            items-center
            bottom-12
            ">
                    <Button
                        label='Remove filetrs'
                        outline
                        customStyles='max-w-[200px] shadow-md text-primary-green-2'
                        onClick={btnClick}
                    />
                </div>
            }
        </>
    )
}

export default RemoveFilter