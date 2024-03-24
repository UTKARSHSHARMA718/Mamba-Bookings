'use client'

import React from 'react'
import Select from 'react-select'
import { useTheme } from 'next-themes';

import useCountryInfo from '@/hooks/useCountryInfo';
import { CountrySelectValue } from '@/types/CountrySelect/CountrySelectTypes';
import { CountrySelectValueType } from '@/types/FilterScreens/FilterScreensTypes';
import { DARK } from '@/constants/const';


const CountrySelect: React.FC<CountrySelectValueType> = ({
    value,
    onChange,
}) => {
    const { getAll } = useCountryInfo();
    const { theme } = useTheme();

    const isDarkTheme = theme === DARK;

    const getOptionBody = (countryValue: any) => (
        <div className='flex gap-3 items-center'>
            <p className='text-xs'>{countryValue?.flag}</p>
            <div>
                {countryValue?.label}
                <span className='text-neutral-500 ml-1 text-xs'>
                    {countryValue?.region}
                </span>
            </div>
        </div>
    )

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            fontSize: 14,
            color: isDarkTheme ? 'white' : 'black',
            backgroundColor: isDarkTheme ? state.isSelected ? 'lightblue' : 'black' : state.isSelected ? 'lightgreen' : 'white', // Change background color for selected options
        }),
    };

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll() || []}
                value={value}
                onChange={(value) => { onChange(value as CountrySelectValue) }}
                formatOptionLabel={(countryValue) => getOptionBody(countryValue)}
                // TODO: below code is not working properly
                // className={{
                //     input: () => 'text-lg dark:bg-slate-900 dark:text-white',
                //     option: () => 'text-lg',
                //     control: () => 'p-3 border-2'
                // }}
                styles={customStyles}
                theme={(theme) => {
                    return {
                        ...theme,
                        primary: 'black',
                        primary25: 'text-primary-green-1',
                    }
                }}
            />
        </div>
    )
}

export default CountrySelect