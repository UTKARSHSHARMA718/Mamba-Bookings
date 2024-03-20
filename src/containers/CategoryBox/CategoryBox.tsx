import React from 'react'
import { IconType } from 'react-icons';

import ToolTip from '@/components/ToolTip/ToolTip';

type CategoryBoxProps = {
    label: string;
    isSelected: boolean;
    icon: IconType;
    description: string;
    onClick: () => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    isSelected,
    icon: Icon,
    description,
    onClick,
}) => {
    const isSelectedStyles = isSelected ? {
        borderBottom: "2px solid black",
        backgroundColor: "#64728126",
        borderRadius: "12px",
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    } : { borderBottom: "2px solid white", };

    return (
        <div
            className={`flex flex-col gap-2 justify-center cursor-pointer items-center p-2 ${isSelectedStyles}`}
            style={isSelectedStyles}
            {...{ onClick }}
        >
            <Icon size={32} />
            <ToolTip {...{ label, description }} customStyles="text-xs" />
        </div>
    )
}

export default CategoryBox