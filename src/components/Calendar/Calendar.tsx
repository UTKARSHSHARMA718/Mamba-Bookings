import React from 'react'
import { DateRange } from 'react-date-range'

import { SELECTED_DATE_CELL_COLOUR } from '@/constants/const';

//NOTE: the below styles might not work properly
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { CalendarTypes } from '@/types/FilterScreens/FilterScreensTypes';



const Calendar: React.FC<CalendarTypes> = ({
    value,
    onChange,
    disabledDate,
}) => {

    return (
        <DateRange
            rangeColors={[SELECTED_DATE_CELL_COLOUR]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            // @ts-ignore
            disabledDates={disabledDate}

        />
    )
}

export default Calendar