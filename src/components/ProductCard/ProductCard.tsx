import Image from 'next/image';
import React from 'react'
import HeartButton from '../HeartButton/HeartButton';

type ProductCardType = {
    title: string;
    subTitle: string;
    price: number;
    imgSrc: string;
}

const ProductCard: React.FC<ProductCardType> = ({
    title,
    subTitle,
    price,
    imgSrc,
}) => {
    const dummyImageUrl = '';

    return (
        <div
            // style={{maxWidth:"25%"}} 
            className={`
        p-6
        rounded-xl 
        flex-col
        gap-2;
        max-h-[350px]
        flex
        justify-center
        items-center
        overflow-hidden
        relative
        `}>
            <div className={`
                absolute
                top-7
                right-8
                z-50
            `}>
                <HeartButton listingId={1} currentUser={null} />
            </div>
            <div className={`
                w-full
                h-3/4
                overflow-hidden
                rounded-xl
                cursor-pointer
            `}>
                <Image src={imgSrc || dummyImageUrl} width={100} height={100} alt={`${title}-image`}
                    className='transition duration-100 rounded-xl max-h-full h-full w-full hover:scale-125' />
            </div>
            <div className='flex flex-col gap-1  w-full items-start p-4 px-0 h-1/4'>
                <div className='flex flex-col gap-2 justify-start items-start'>
                    <div>
                        <p className='text-sm text-black font-bold'>{title}</p>
                    </div>
                    <div>
                        <p className='text-xs text-slate-400 font-medium'>{subTitle}</p>
                    </div>
                </div>
                <div className='flex gap-1 justify-center items-start'>
                    <p className='text-black font-bold text-xs'>$ {price} </p>
                    <p className='text-xs'>nights</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard