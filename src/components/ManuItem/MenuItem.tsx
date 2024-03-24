import React from 'react'
type MenuProps = {
    label: string;
    onClick: () => void;
    customStyles?: string;
}

const MenuItem: React.FC<MenuProps> = ({
    label,
    onClick,
    customStyles,
}) => {

    return (
        <div className={`p-2 cursor-pointer flex justify-center rounded-xl items-center hover:bg-slate-100 transition dark:hover:bg-gray-400 ${customStyles}`}
            {...{ onClick }}
        >
            <p className='font-medium text-sm'>{label}</p>
        </div>
    )
}

export default MenuItem