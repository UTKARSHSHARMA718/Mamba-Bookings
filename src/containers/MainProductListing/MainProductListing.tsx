import React from 'react'

import EmptyPage from '@/components/EmptyPage/EmptyPage';
import GridView from '@/components/GridView/GridView';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Listing } from '@prisma/client';
import { SafeUser } from '@/types/DataBaseModes/DataBaseModes';

type MainProductListingProps = {
    allListings: Listing[] | null;
    user: SafeUser | null;
}

const MainProductListing: React.FC<MainProductListingProps> = async ({
    allListings,
    user,
}) => {

    if (!allListings || !allListings?.length) {
        return <EmptyPage
            title='No products for listing!'
            description='Please add some products to show them here.'
        />
    }

    return (
        <GridView>
            <>
                {
                    allListings?.map((product) => {
                        return <ProductCard
                            key={product?.id}
                            price={product.price}
                            imgSrc={product.imageSrc}
                            listingId={product.id}
                            currentUser={user}
                            locationValue={product?.locationValue}
                            category={product?.category}
                        />
                    })
                }
            </>
        </GridView>
    )
}

export default MainProductListing