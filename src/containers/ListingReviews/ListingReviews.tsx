'use client'

import React, { useEffect } from 'react';
import { MdOutlineRateReview } from "react-icons/md";

import Button from '@/components/Button/Button';
import ReviewAndRatingCard from '@/components/ReviewAndRatingCard/ReviewAndRatingCard';

import useReviewModal from '@/hooks/useReviewModal';
import { humanReadableDateFormate } from '@/libs/utils/util';
import { CompleteListingDataType, CompleteRatingData, SafeUser } from '@/types/DataBaseModes/DataBaseModes'
import styles from "./ListingReviews.module.css"

type ListingReviewsProps = {
    currentUser: SafeUser | null,
    listingData: Omit<CompleteListingDataType, "ratings"> & { ratings: CompleteRatingData[] } & { canProvideReview: boolean } | null;
}

const ListingReviews: React.FC<ListingReviewsProps> = ({ currentUser, listingData }) => {
    const reviewModal = useReviewModal();

    const allRatings = listingData?.ratings;
    const allRatingExceptCurrentUser = allRatings?.filter(rating => rating?.userId !== currentUser?.id);
    const currentUserRating = allRatings?.find(rating => rating?.userId === currentUser?.id);

    useEffect(() => {
        if (listingData?.canProvideReview) {
            reviewModal?.setRating(currentUserRating?.rating || 1);
            reviewModal?.setReview(currentUserRating?.review || "");
            reviewModal?.setData(currentUser?.id || "", listingData?.id, currentUserRating?.id || "")
        }
    }, [currentUserRating?.review, currentUserRating?.rating])

    return (
        <div className='flex flex-col gap-6 w-full m-auto max-w-[1200px] p-6'>
            {currentUserRating && <ReviewAndRatingCard
                rating={currentUserRating?.rating!}
                review={currentUserRating?.review!}
                userName={currentUserRating?.user?.name!}
                dateOfReview={humanReadableDateFormate(`${currentUserRating?.updatedAt}`)}
            />}
            {
                listingData?.canProvideReview &&
                <div className={styles.buttonContainer}>
                    <Button
                        label={currentUserRating ? 'Update Review' : "Submit Review"}
                        small
                        icon={MdOutlineRateReview}
                        onClick={reviewModal?.onOpen}
                    />
                </div>
            }
            <hr />
            {
                allRatingExceptCurrentUser?.map(rating => {
                    return <ReviewAndRatingCard
                        rating={rating?.rating}
                        review={rating?.review}
                        userName={rating?.user?.name!}
                        dateOfReview={humanReadableDateFormate(`${rating?.updatedAt}`)}
                    />
                })
            }
        </div>
    )
}

export default ListingReviews