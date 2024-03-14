import React from 'react'

import { BoxViewProps } from '@/types/BoxView/BoxViewTypes'


const BoxView: React.FC<BoxViewProps> = ({ children }) => {

    return (
        <div className='max-w-[2520px] mx-auto p-4 sm:p-2 md:p-10 xl:p-20'>
            {children}
        </div>
    )
}

export default BoxView