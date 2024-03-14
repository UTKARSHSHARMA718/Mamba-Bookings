import React from 'react';
import { BiSearch } from "react-icons/bi"

const SearchBar: React.FC<{}> = () => {
  const options: { text: string; onClick: () => void }[] = [
    {
      text: "Anywhere",
      onClick: () => { },
    },
    {
      text: "Any Week",
      onClick: () => { },
    },
    {
      text: "Add Guest",
      onClick: () => { },
    },
  ]

  const activeClass = 'text-black';

  return (
    <div
      className={`w-full justify-between p-2 bg-slate-100 flex sm:justify-around items-center rounded-full gap-2  max-w-[400px]`}>
      {
        options.map((option, index, array) => {
          const totalElements = array?.length;
          return <>
            <div key={index} className={`p-1 ${index === 0 ? 'block' : 'hidden'} sm:block text-sm font-semibold cursor-pointer ${index % 2 == 1 ? activeClass : "text-gray-400"} `}>
              {option?.text}
            </div>
            {
              index !== totalElements - 1 && <div className='hidden sm:block min-w-[1px] min-h-[16px] bg-slate-400'></div>
            }
          </>
        })
      }
      <BiSearch className='bg-primary-red rounded-full text-white min-w-[25px] min-h-[25px] p-1 cursor-pointer' />
    </div>
  )
}

export default SearchBar