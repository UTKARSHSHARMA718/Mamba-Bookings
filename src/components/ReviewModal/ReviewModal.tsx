'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import Input from '../Input/Input'
import Modal from '../Modal/Modal'
import StarRating from '../StarRating/StarRating'

import useReviewModal from '@/hooks/useReviewModal'
import { API, RATING } from '@/constants/apiEndpoints'

const ReviewModal = () => {
    const router = useRouter();

    const { isOpen, onClose, rating, review, data } = useReviewModal();
    const { ratingId, userId, listingId } = data;

    const [isLoading, setIsLoading] = useState(false);
    const [localRating, setLocalRating] = useState(rating || 1);
    const [localReview, setLocalReview] = useState(review || "");

    const closeModalHandler = () => {
        onClose();
        setLocalRating(1);
        setLocalReview("");
    }

    const onSubmitReview = async () => {
        setIsLoading(true);
        try {
            let url = "/" + API + RATING;
            let res;
            if (ratingId) {
                res = await axios.put(url, {
                    rating: localRating,
                    review: localReview,
                    ratingId,
                })
            } else {
                res = await axios.post(url, {
                    rating: localRating,
                    review: localReview,
                    userId,
                    listingId,
                })
            }
            if (res?.data?.ok) {
                toast?.success(res?.data?.message);
                closeModalHandler();
                router?.refresh();
                return;
            }
            toast?.error(res?.data?.message);
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-4 justify-center w-full'>
            <StarRating
                rating={localRating}
                isAlignVerticleForSmallScreens={false}
                onClick={(value: number) => setLocalRating(value)}
            />
            <Input
                id='review'
                label='Review'
                disabled={isLoading}
                required
                onChange={setLocalReview}
                value={localReview}
            />
        </div>
    )


    useEffect(() => {
        if (isOpen) {
            setLocalRating(rating || 1);
            setLocalReview(review || "");
        }
    }, [isOpen])

    return (
        <Modal
            onClose={closeModalHandler}
            {...{ isOpen }}
            onSubmit={onSubmitReview}
            title='Property Review'
            disabled={isLoading}
            actionLabel='Submit Review'
            body={bodyContent}
        />
    )
}

export default ReviewModal