import React, { useCallback } from 'react'

import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

type UploadImage = {
    onSuccessFulUpload: (value: string) => void;
    imgSrc?: string;
}

const UplaodImage: React.FC<UploadImage> = ({ onSuccessFulUpload, imgSrc }) => {

    const CLOUDINARY_UPLOAD_PRESET = 'bidjl68z';
    const helperText = "Please upload an image!"

    const handleUpload = useCallback((result: any) => {
        onSuccessFulUpload(result.info.secure_url);
    }, [onSuccessFulUpload]);

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset={CLOUDINARY_UPLOAD_PRESET}
        >
            {
                ({ open }) => {
                    return (
                        <div
                            onClick={() => open?.()}
                            className={`
                            flex
                            justify-center
                            items-center
                            bg-slate-100
                            p-2
                            border-[1px]
                            rounded-xl
                            w-full
                            min-h-[200px]
                            hover:opacity-70
                            cursor-pointer
                            `}
                        >
                            {!imgSrc && <span className='flex flex-col gap-3 justify-center items-center'>
                                <TbPhotoPlus size={24} />
                                <p className='text-xs'>
                                    {helperText}
                                </p>
                            </span>}
                            {imgSrc && <Image
                                style={{ objectFit: 'contain', position: 'static' }}
                                src={imgSrc} alt='Preview Image'
                                width={100}
                                height={100}
                                className='w-full max-h-[200px] static' />}
                        </div>
                    )
                }
            }
        </CldUploadWidget>
    )
}

export default UplaodImage