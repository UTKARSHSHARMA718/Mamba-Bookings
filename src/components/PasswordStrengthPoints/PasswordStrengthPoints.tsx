import { CAPITAL_LETTERS, NUMBERS, SMALL_LETTERS, SPECIAL_CHARACTERS } from '@/constants/regex';
import React from 'react';
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";

type PasswordStrengthPointsProps = {
    input: string;
}

type PointsType = {
    label: string;
    isValid: boolean;
}

const PasswordStrengthPoints: React.FC<PasswordStrengthPointsProps> = ({
    input,
}) => {
    const pointsList: PointsType[] = [
        {
            label: 'Capital letters',
            isValid: CAPITAL_LETTERS.test(input),
        },
        {
            label: 'Small letters',
            isValid: SMALL_LETTERS.test(input),
        },
        {
            label: 'Numbers',
            isValid: NUMBERS.test(input),
        },
        {
            label: 'Special characters (!@#$%^&*)',
            isValid: SPECIAL_CHARACTERS.test(input),
        },
        {
            label: 'Min length of 8 digits',
            isValid: input?.length >= 8,
        },
        {
            label: 'Max length of 16 digits',
            isValid: input?.length <= 16 && input?.length > 0,
        },
    ]

    return (
        <div className='p-1 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:p-4 sm:gap-6'>
            {pointsList?.map(point => {
                return <div key={point?.label} className='p-1 flex gap-2 text-xs font-semibold dark:text-white'>
                    {point?.isValid ? <FaCircle size={20} color='green' /> : <FaRegCircle size={20} />}
                    <p>{point?.label}</p>
                </div>
            })}
        </div>
    )
}

export default PasswordStrengthPoints