import React from 'react'
import { DateRange } from 'react-date-range'

import { CalendarTypes } from '@/types/FilterScreens/FilterScreensTypes';
import { SELECTED_DATE_CELL_COLOUR } from '@/constants/const';

//NOTE: the below styles might not work properly
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Calendar: React.FC<CalendarTypes> = ({
    value,
    onChange,
    disabledDate,
}) => {

    return (
        <DateRange
            className={`dark:bg-slate-700 dark:text-white`}
            rangeColors={[SELECTED_DATE_CELL_COLOUR]}
            ranges={[value]}
            date={new Date()}
            onChange={onChange}
            dis
            direction='vertical'
            showDateDisplay={false}
            minDate={new Date()}
            // TODO: disable dates are not working properly
            // @ts-ignore
            disabledDates={disabledDate}

        />
    )
}

export default Calendar