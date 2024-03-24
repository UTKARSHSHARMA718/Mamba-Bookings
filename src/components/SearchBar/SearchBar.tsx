import React from 'react';
import { BiSearch } from "react-icons/bi"

type SearchProps = {
  onClickAnywhere: () => void;
  onClickAnyWeek: () => void;
  onClickGuets: () => void;
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchProps> = ({
  onClickAnyWeek,
  onClickAnywhere,
  onClickGuets,
  onSearchClick,
}) => {
  const options: { text: string; onClick: () => void }[] = [
    {
      text: "Anywhere",
      onClick: onClickAnywhere,
    },
    {
      text: "Any Week",
      onClick: onClickAnyWeek,
    },
    {
      text: "Add Guest",
      onClick: onClickGuets,
    },
  ]

  return (
    <div
      className={`
      w-full 
      justify-between 
      p-2 
      bg-slate-100 
      flex 
      sm:justify-around 
      items-center 
      rounded-full 
      gap-2  
      max-w-[400px]
      hover:shadow-md
      dark:bg-slate-900
      dark:hover:shadow-slate-200
      `}>
      {
        options.map((option, index, array) => {
          const totalElements = array?.length;
          return <React.Fragment key={index}>
            <p 
            onClick={option?.onClick}
            key={index} 
            className={`p-1 ${index === 0 ? 'block' : 'hidden'} 
            sm:block 
            text-sm 
            font-semibold 
            cursor-pointer
            text-gray-400 
            hover:text-black
            dark:hover:text-white
            `}>
              {option?.text}
            </p>
            {
              index !== totalElements - 1 && <div className='hidden sm:block min-w-[1px] min-h-[16px] bg-slate-400'></div>
            }
          </React.Fragment>
        })
      }
      <BiSearch
        onClick={onSearchClick}
        className='bg-primary-green-2 rounded-full text-white min-w-[25px] min-h-[25px] p-1 cursor-pointer' />
    </div>
  )
}

export default SearchBar