import React from 'react'
type MenuProps = {
    label: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuProps> = ({
    label,
    onClick,
}) => {

    return (
        <div className="p-2 cursor-pointer flex justify-center items-center hover:bg-slate-100/70 transition"
            {...{ onClick }}
        >
            <p>{label}</p>
        </div>
    )
}

export default MenuItem