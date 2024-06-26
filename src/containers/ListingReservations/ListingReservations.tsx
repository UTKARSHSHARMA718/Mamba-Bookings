import React from 'react'
import { Range } from 'react-date-range';

import Button from '@/components/Button/Button';
import Calendar from '@/components/Calendar/Calendar';
import { currencyNumberFormatter } from '@/libs/utils/util';

type ListingReservationsProps = {
    price: number;
    totalPrice: number;
    onDateChange: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled: boolean;
    disabledDate: Range[];
}

const ListingReservations: React.FC<ListingReservationsProps> = ({
    price,
    totalPrice,
    onDateChange,
    dateRange,
    onSubmit,
    disabled,
    disabledDate,
}) => {

    return (
        <div className="
        bg-white
        dark:bg-slate-700
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        flex
        flex-col
        gap-4
        p-3
        ">
            <div className="
            flex
            items-center
            justify-center
            gap-1
            p-2
            dark:bg-slate-700
            ">
                <div className="
                text-xl 
                font-semibold
                ">
                    {currencyNumberFormatter(price)}
                </div>
                <div className="
                font-light
                text-neutral-600
                ">
                    night
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDate={disabledDate}
                onChange={(value) => onDateChange(value?.selection)}
            />
            <hr />
            <Button
                label='Reserve'
                {...{ disabled }}
                onClick={onSubmit}
            />
            <div className='flex justify-between items-center gap-4 w-full'>
                <p className='text-sm font-bold'>Total:</p>
                <p className='text-sm font-bold'>{currencyNumberFormatter(totalPrice)}</p>
            </div>
        </div>
    )
}

export default ListingReservations