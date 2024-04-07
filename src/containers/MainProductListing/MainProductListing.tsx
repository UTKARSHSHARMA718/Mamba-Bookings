'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useRouter, useSearchParams } from 'next/navigation';

import GridView from '@/components/GridView/GridView';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductCardShimmer from '@/ShimmerUI/ProductCard/ProductCardShimmer';
import useDeleteListingApi from '@/hooks/useDeleteListingApi';
import { CompleteListingDataType, SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import { getAllListing } from '@/actions/getAllListings';
import { GENERAL_ERROR_MESSAGE } from '@/constants/errorMessage';
import { PAGE_SIZE } from '@/constants/const';

type UpdatedListingType = Omit<CompleteListingDataType, "ratings"> & { isGuestFav: boolean } & { ratings: number }

type MainProductListingProps = {
    allListings: UpdatedListingType[] | null;
    user: SafeUser | null;
    isDeleteOptionAvailable?: boolean;
    totalListings?: number;
}

const MainProductListing: React.FC<MainProductListingProps> = ({
    allListings,
    user,
    isDeleteOptionAvailable,
    totalListings = 10,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { ref, inView } = useInView();

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(allListings);
    const [isMounted, setIsMounted] = useState(false);

    const { deleteListingHandler, isLoading } = useDeleteListingApi({});

    const listingProps = {
        category: searchParams?.get("categories")?.split(",") || [],
        bathroomCount: +(searchParams?.get("bathroomCount") || 1),
        guestCount: +(searchParams?.get("guestCount") || 1),
        roomCount: +(searchParams?.get("roomCount") || 1),
        locationValue: searchParams?.get("locationValue") || "",
        startDate: searchParams?.get("startDate") || "",
        endDate: searchParams?.get("endDate") || "",
    }

    const loaderMoreDataHandler = async (listingData: UpdatedListingType[] | null, currentPageNumber: number) => {
        setIsDataLoading(true);
        try {
            const newPageNumber = currentPageNumber + 1;
            setPageNumber(newPageNumber);
            const res = await getAllListing({ ...listingProps, pageSize: PAGE_SIZE, pageNumber: newPageNumber });
            setData([...(listingData || []), ...(res?.data || [])]);
            router?.refresh();
        } catch (err: any) {
            toast?.error(GENERAL_ERROR_MESSAGE);
        } finally {
            setIsDataLoading(false);
        }
    }

    useEffect(() => {
        if (inView && (pageNumber * PAGE_SIZE) < totalListings) {
            loaderMoreDataHandler(data, pageNumber);
        }
    }, [inView])

    useEffect(() => {
        if (searchParams && isMounted) {
            loaderMoreDataHandler(null, 0);
            return;
        }
        setIsMounted(true);
    }, [searchParams])

    return (
        <div>
            <GridView>
                <>
                    {
                        data?.map((product, index) => {
                            return <ProductCard
                                // @ts-ignore
                                ref={index === data?.length - 1 ? ref : null}
                                disabled={isLoading}
                                key={product?.id}
                                price={product.price}
                                imgSrc={product.imageSrc}
                                listingId={product.id}
                                currentUser={user}
                                locationValue={product?.locationValue}
                                category={product?.category}
                                actionLabel={isDeleteOptionAvailable ? 'Delete Listing' : ""}
                                onAction={isDeleteOptionAvailable ? deleteListingHandler : () => { }}
                                isGuestFav={product?.isGuestFav}
                                rating={product?.ratings}
                            />
                        })
                    }
                    {isDataLoading &&
                        <>
                            {
                                (new Array(10).fill(1))?.map((item, index) => {
                                    return <ProductCardShimmer key={index} />
                                })
                            }
                        </>
                    }
                </>
            </GridView>
        </div>
    )
}

export default MainProductListing