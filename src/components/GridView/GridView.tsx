import React from 'react'

type GridViewProps = {
    children: React.ReactElement | null;
}

const GridView: React.FC<GridViewProps> = ({ children }) => {
    return (
        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        ">
            {children}
        </div>
    )
}

export default GridView
