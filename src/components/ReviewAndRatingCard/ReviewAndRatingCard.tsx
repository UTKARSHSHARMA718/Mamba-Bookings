import React from 'react'
import Profile from '../Profile/Profile';
import Avatar from '../Avatar/Avatar';
import StarRating from '../StarRating/StarRating';

type ReviewAndRatingCardProps = {
    userName: string;
    rating: number;
    review: string;
    dateOfReview: string;
}

const ReviewAndRatingCard: React.FC<ReviewAndRatingCardProps> = ({ userName, rating, review, dateOfReview }) => {

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex gap-3 items-center'>
                <Avatar size={40} />
                <p>{userName}</p>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-3'>
                    <StarRating {...{ rating }} isAlignVerticleForSmallScreens={false} isLabelRequired={false} sizeOfStars={10} />
                    <p className='text-xs font-medium'>{dateOfReview}</p>
                </div>
                <p>{review}</p>
            </div>
        </div>
    )
}

export default ReviewAndRatingCard