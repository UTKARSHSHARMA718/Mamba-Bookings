'use client'

import { getCurrentUser } from "@/actions/getCurrentUser";
import useMarkFavourite from "@/hooks/useMarkFavourite";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type HeartTypes = {
  listingId: number;
  currentUser: User | null;
};

const HeartButton: React.FC<HeartTypes> = ({
  listingId,
  currentUser,
}) => {
  const hasFavourite = true;

  // const [currentUser, setCurrentUser] = useState(null);
  // TODO: try using useOptimistic here
  // const { hasFavourite, markFavorite, isLoading, error } =
  //   useMarkFavourite({ listingId, currentUser });


  // useEffect(() => {
  //   const getCurrentUserDetails = async () => {
  //     try {
  //       const data = await getCurrentUser();
  //       if (!data) {
  //         setCurrentUser(data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   getCurrentUserDetails();
  // }, [])

  return <>
    {hasFavourite ? 
    <AiFillHeart size={24} className="text-red-500 cursor-pointer" /> : 
    <AiOutlineHeart size={24} className="text-white cursor-pointer" />}
  </>;
};

export default HeartButton;
