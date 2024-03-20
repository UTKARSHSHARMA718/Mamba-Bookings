'use client'

import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useMarkFavourite from "@/hooks/useMarkFavourite";
import { SafeUser } from "@/types/DataBaseModes/DataBaseModes";

type HeartButtonProps = {
  listingId: string;
  currentUser: SafeUser | null;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourite, markFavorite } =
    useMarkFavourite({ listingId, currentUser });

  return <>
    {hasFavourite ?
      //@ts-ignore
      <AiFillHeart size={24} className="text-red-500 cursor-pointer" onClick={markFavorite} /> :
      //@ts-ignore
      <AiOutlineHeart size={24} className="text-white cursor-pointer" onClick={markFavorite} />}
  </>;
};

export default HeartButton;
