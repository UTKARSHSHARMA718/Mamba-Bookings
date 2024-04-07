import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

type GridViewProps = {
    children: React.ReactElement | null;
}

const GridView: React.FC<GridViewProps> = (props) => {
    const { children } = props;

    return (
        // @ts-ignore
        <div className="
        p-6
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-4
        ">
            {children}
        </div>
    )
}

export default GridView;
