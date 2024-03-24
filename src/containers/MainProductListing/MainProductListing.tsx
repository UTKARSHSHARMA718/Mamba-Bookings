'use client'

import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import GridView from '@/components/GridView/GridView';
import ProductCard from '@/components/ProductCard/ProductCard';
import ProductCardShimmer from '@/ShimmerUI/ProductCard/ProductCardShimmer';
import { Listing } from '@prisma/client';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';
import { getAllListing } from '@/actions/getAllListings';
import { GENERAL_ERROR_MESSAGE } from '@/constants/errorMessage';
import { API, LISTING } from '@/constants/apiEndpoints';
import { PAGE_SIZE } from '@/constants/const';

type MainProductListingProps = {
    allListings: Listing[] | null;
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

    const listingProps = {
        category: searchParams?.get("categories")?.split(",") || [],
        bathroomCount: +(searchParams?.get("bathroomCount") || 1),
        guestCount: +(searchParams?.get("guestCount") || 1),
        roomCount: +(searchParams?.get("roomCount") || 1),
        locationValue: searchParams?.get("locationValue") || "",
        startDate: searchParams?.get("startDate") || "",
        endDate: searchParams?.get("endDate") || "",
    }

    const [isLoading, setIsLoading] = useState(false);
    // TODO: create a hook for below work later
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(allListings);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const deleteListingHandler = useCallback(async (listingId: string) => {
        setIsLoading(true);
        try {
            const url = API + LISTING + `/${listingId}`;
            const res = await axios.delete(url);
            if (res?.data?.ok) {
                toast?.success("Listing deleted successfully!");
                router?.refresh();
                return;
            }
            toast.error(GENERAL_ERROR_MESSAGE);
        } catch (err: any) {
            toast.error(err?.messgae);
        } finally {
            setIsLoading(false);
        }
    }, [axios, toast, isLoading, router]);

    const loaderMoreDataHandler = async () => {
        if ((pageNumber * PAGE_SIZE) > totalListings) {
            return;
        }
        setIsDataLoading(true);
        try {
            const newPageNumber = pageNumber + 1;
            setPageNumber(newPageNumber);
            const res = await getAllListing({ ...listingProps, pageSize: PAGE_SIZE, pageNumber: newPageNumber });
            setData([...(data || []), ...(res?.data || [])]);
            router?.refresh();
        } catch (err: any) {
            toast?.error(GENERAL_ERROR_MESSAGE);
        } finally {
            setIsDataLoading(false);
        }
    }

    // TODO: complete the below code with proper testing
    // useEffect(() => {
    //     loaderMoreDataHandler();
    // },
    //     [

    //     ])

    return (
        <div>
            <GridView callBack={loaderMoreDataHandler}>
                <>
                    {
                        data?.map((product) => {
                            return <ProductCard
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
                            />
                        })
                    }
                </>
            </GridView>
            {isDataLoading &&
                <GridView>
                    <>
                        {
                            (new Array(10).fill(1))?.map((item, index) => {
                                return <ProductCardShimmer key={index} />
                            })
                        }
                    </>
                </GridView>
            }
        </div>
    )
}

export default MainProductListing