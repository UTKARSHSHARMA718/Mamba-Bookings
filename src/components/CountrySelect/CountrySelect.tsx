import React from 'react'
import Select from 'react-select'

import useCountryInfo from '@/hooks/useCountryInfo';
import { CountrySelectValue } from '@/types/CountrySelect/CountrySelectTypes';
import { CountrySelectValueType } from '@/types/FilterScreens/FilterScreensTypes';


const CountrySelect: React.FC<CountrySelectValueType> = ({
    value,
    onChange,
}) => {

    const { getAll } = useCountryInfo();

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

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll() || []}
                value={value}
                onChange={(value) => { onChange(value as CountrySelectValue) }}
                formatOptionLabel={(countryValue) => getOptionBody(countryValue)}
                className={{
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                    control: () => 'p-3 border-2'
                }}
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