'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'

import CountrySelect from '@/components/CountrySelect/CountrySelect'
import Heading from '@/components/Headers/Heading'
import { CountrySelectValueType, MapTypes } from '@/types/FilterScreens/FilterScreensTypes'

const LocationScreen: React.FC<CountrySelectValueType & MapTypes> = ({
    value,
    onChange,
    center,
}) => {
    const Map = useMemo(() => dynamic(() => import('@/components/Map/Map'), {
        ssr: false,
    }), [value])

    return (
        <>
            <Heading
                heading='Where do you wanna go?'
                subHeading='Find the perfect location!'
            />
            <div className="
            flex
            flex-col
            gap-3
            min-h-[200px]
            "
            >

                <CountrySelect
                    {...{ value, onChange }}
                />
                <Map {...{ center }} />
            </div>
        </>
    )
}

export default LocationScreen