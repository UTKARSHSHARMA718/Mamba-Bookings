import React from 'react'

import ProductCard from '@/components/ProductCard/ProductCard'

const MainProductListing = () => {

    const dummyData = [
        {
            title: "My home",
            subTitle: "Sub label",
            price: 110,
            imgSrc: "https://res.cloudinary.com/ddnf8x3zb/image/upload/v1710326629/xtjbucekgvwo6o4jw9tf.jpg",
        },
        {
            title: "My home",
            subTitle: "Sub label",
            price: 110,
            imgSrc: "https://res.cloudinary.com/ddnf8x3zb/image/upload/v1710326629/xtjbucekgvwo6o4jw9tf.jpg",
        },
        {
            title: "My home",
            subTitle: "Sub label",
            price: 110,
            imgSrc: "https://res.cloudinary.com/ddnf8x3zb/image/upload/v1710326629/xtjbucekgvwo6o4jw9tf.jpg",
        },
        {
            title: "My home",
            subTitle: "Sub label",
            price: 110,
            imgSrc: "https://res.cloudinary.com/ddnf8x3zb/image/upload/v1710326629/xtjbucekgvwo6o4jw9tf.jpg",
        },
    ]

    return (
        <div className={`
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        gap-4
        `}>
            {
                dummyData?.map((product, index) => {
                    return <ProductCard
                        key={index}
                        title={product.title}
                        subTitle={product.subTitle}
                        price={product.price}
                        imgSrc={product.imgSrc}
                    />
                })
            }
        </div>
    )
}

export default MainProductListing