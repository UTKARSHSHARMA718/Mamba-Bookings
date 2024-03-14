import React from 'react'

type ToolTipType = {
    label: string;
    description: string;
    customStyles?: string;
}

const ToolTip: React.FC<ToolTipType> = ({
    label,
    description,
    customStyles
}) => {

    return (
        <div className='relative'>
            <p className={`peer text-black ${customStyles ? customStyles : 'text-lg'}`}>{label}</p>
            <p className='hidden text-xs font-medium text-white absolute left-4 top-[-50px] bg-slate-500 p-2 rounded-lg z-99 peer-hover:block min-w-[200px]'>
                {description}
            </p>
        </div>
    )
}

export default ToolTip