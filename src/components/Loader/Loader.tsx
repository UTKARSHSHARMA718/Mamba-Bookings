import React from 'react'
import Image from 'next/image'

type LoaderProps = {
    size?: number;
}

const Loader:React.FC<LoaderProps> = ({ size = 50 }) => {

    return (
        <div className='min-h-1/2 w-full flex justify-center items-center p-4'>
            <Image src="/images/svg/spinner.svg" alt="spinner-image" width={size} height={size} />
        </div>
    )
}

export default Loader