import React from 'react';

import Calendar from '@/components/Calendar/Calendar';
import Heading from '@/components/Headers/Heading';
import { CalendarTypes } from '@/types/FilterScreens/FilterScreensTypes';
import { Range } from 'react-date-range';

type CalenderScreenProps = Omit<CalendarTypes, "onChange"> & {
    onChange: (v: Range) => void
}

const CalenderScreen: React.FC<CalenderScreenProps> = ({
    value,
    onChange,
    disabledDate,
}) => {
    return (
        <>
            <Heading
                heading='Where do you plan go?'
                subHeading='Make sure everyone is free!'
            />
            <div className="
            flex
            flex-col
            gap-2
            "
            >
                <Calendar
                    {...{ value, disabledDate }}
                    onChange={(value) => {
                        onChange(value?.selection)
                    }}
                />
            </div>
        </>
    )
}

export default CalenderScreen