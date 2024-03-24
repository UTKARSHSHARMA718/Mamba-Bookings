import React from 'react'

const ProductCardShimmer = () => {
    const EmptyParaComponent = () => (<p className='bg-slate-400 min-w-[200px] min-h-[16px] rounded-xl'></p>);

    return (
        <div className='min-w-[200px] min-h-[200px] rounded-lg bg-slate-100 flex flex-col gap-4 justify-center items-center p-4'>
            <div className='min-w-[200px] min-h-[200px] bg-slate-400 rounded-xl w-full'></div>
            <div className='flex flex-col gap-3 w-full'>
                <div className='w-full'>
                    <EmptyParaComponent />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <EmptyParaComponent />
                    <EmptyParaComponent />
                </div>
            </div>
        </div>
    )
}

export default ProductCardShimmer