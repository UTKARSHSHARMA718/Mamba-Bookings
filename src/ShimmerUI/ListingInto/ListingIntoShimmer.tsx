import React from 'react'

const ListingIntoShimmer = () => {
    const EmptyParaComponent = () => (<p className='bg-slate-400 min-w-[200px] min-h-[16px] rounded-xl'></p>);

    return (
        <div className='flex gap-6 p-2 rounded-xl m-auto max-w-[1200px] w-full items-center justify-center' style={{ maxWidth: '1200px', margin:'auto' }}>
            <div className='flex flex-col gap-3 w-full'>
                <div className='flex flex-col gap-3 w-1/2'>
                    <EmptyParaComponent />
                    <EmptyParaComponent />
                </div>
                <hr />
                <div className='flex gap-3 w-1/2'>
                    <div className='min-w-[100px] min-h-[100px] rounded-xl bg-slate-400' style={{ minHeight: '50px', minWidth: '50px' }}>
                    </div>
                    <div className='flex flex-col gap-3 w-1/2 justify-around'>
                        <EmptyParaComponent />
                        <EmptyParaComponent />
                    </div>
                </div>
                <hr />
                <div className='flex flex-col gap-3 w-1/2'>
                    <EmptyParaComponent />
                    <EmptyParaComponent />
                    <EmptyParaComponent />
                </div>
                <hr />
                <div className='p2 rounded-xl'>
                    <div className='min-h-[300px] min-w-[600px] bg-slate-400 rounded-xl' style={{ minHeight: "300px", minWidth: "600px" }}></div>
                </div>
            </div>
            <div className='p-4 rounded-xl w-full'>
                <div className='min-h-[600px] min-w-[300px] bg-slate-400 rounded-xl' style={{ minHeight: '600px', minWidth: "300px" }}></div>
            </div>
        </div>
    )
}

export default ListingIntoShimmer