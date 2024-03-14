'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import CategoryInput from '@/components/CategoryInput/CategoryInput'
import Counter from '@/components/Counter/Counter'
import Heading from '@/components/Headers/Heading'
import Modal from '@/components/Modal/Modal'
import UplaodImage from '@/components/UplaodImage/UplaodImage'
import useRentModal from '@/hooks/useRentModal'
import { getSelectedCategory } from '@/libs/utils/util'
import { API, CREATE, LISTING, LOGIN } from '@/constants/apiEndpoints'
import { COMPANY_NAME, CREDENTIALS, SELECTED_CATEGORY, categoriesToRender } from '@/constants/const'
import { LOGGED_IN_FAILED_MESSAGE, LOGGED_IN_MESSAGE, NEW_LISTING_CREATED_MESSAGE, NEW_LISTING_FAILED_MESSAGE } from '@/constants/generalMessage'
import { STEPS, STEP_TYPES } from '@/enums/RentModalEnum'
import Map from '@/components/Map/Map'
import CountrySelect from '@/components/CountrySelect/CountrySelect'
import { CountrySelectValue } from '@/types/CountrySelect/CountrySelectTypes'
import { getCountersInfo } from './RentModalConfig'
import Input from '@/components/Input/Input'
import axios from 'axios'


const RentModal = () => {

    const rentModal = useRentModal();
    const router = useRouter();
    const params = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [userMove, setUserMove] = useState(0);

    const {
        reset,
        setValue,
        register,
        watch,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')
    const price = watch('price')
    const title = watch('title')
    const description = watch('description')

    console.log({ location, title, description, price, category })


    const updateStatesValue = (id: string, value: string | number) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const CountersInfo = getCountersInfo({ updateStatesValue, bathroomCount, guestCount, roomCount });



    const handleOnUpload = (uploadImagString: string) => {
        console.log({ uploadImagString })
        updateStatesValue('imageSrc', uploadImagString);
    }


    const bodyContent = (
        <div className='flex flex-col gap-2 h-full'>

            {userMove === STEPS.CATEGORY &&
                <>
                    <Heading
                        heading="Which of these best describe your place"
                        subHeading='Pick a category'
                    />
                    <div className='grid grid-cols-2 gap-2 overflow-y-auto'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: "1fr 1fr",
                            overflowY: 'auto',
                            maxHeight: "400px" //TODO: need to fix this later
                        }}
                    >
                        {
                            categoriesToRender?.map((item, index) => {
                                return <CategoryInput
                                    key={index}
                                    label={item.label}
                                    icon={item.icon}
                                    isSelected={category === item?.label}
                                    selectedCategory={category}
                                    setSelectedCategory={(value) => updateStatesValue('category', value)}
                                />
                            })
                        }

                    </div>
                </>
            }

            {
                userMove === STEPS.DESCRIPTION &&
                <div className='flex flex-col gap-6'>
                    <Heading
                        heading="How would you describe your place?"
                        subHeading="Short and sweet works best!"
                    />
                    <div className="flex flex-col gap-6">
                        <Input
                            id="title"
                            label="Title"
                            disabled={isLoading}
                            required
                            {...{ register, errors }}
                        />
                        <Input
                            id="description"
                            label="Description"
                            disabled={isLoading}
                            required
                            {...{ register, errors }}
                        />
                    </div>
                </div>
            }

            {
                userMove === STEPS.LOCATION &&
                <div className='flex flex-col gap-6'>
                    <Heading
                        heading="Where is your place located?"
                        subHeading="Help guests find you!"
                    />
                    <CountrySelect value={location}
                        onChange={(value) => updateStatesValue('location', value)} />
                    <Map center={location?.latlgn} />
                </div>
            }

            {
                userMove === STEPS.INFO &&
                <div className='flex flex-col gap-6'>
                    <Heading
                        heading="Share some basics about your place"
                        subHeading="What amenitis do you have?"
                    />
                    <div className='flex flex-col gap-4'>
                        {
                            CountersInfo?.map((item, index) => {
                                return <Counter
                                    key={index}
                                    label={item?.label}
                                    onAdd={item?.onAdd}
                                    onSub={item?.onSub}
                                    value={item?.value}
                                    isAddDisabled={item?.isAddDisabled}
                                    isSubDisabled={item?.isSubDisabled}
                                />
                            })
                        }
                    </div>
                </div>
            }

            {
                userMove === STEPS.IMAGES &&
                <div className='flex flex-col gap-6'>
                    <Heading
                        heading="Add a photo of your place"
                        subHeading="Show guests what your place looks like!"
                    />
                    <UplaodImage onSuccessFulUpload={handleOnUpload} imgSrc={imageSrc} />
                </div>
            }

            {
                userMove === STEPS.PRICE &&
                <div className='flex flex-col gap-6'>
                    <Heading
                        heading="Now, set your price"
                        subHeading="How much do you charge per night?"
                    />
                    <Input
                        id='price'
                        label='Price'
                        isPriceInput
                        disabled={isLoading}
                        required
                        type='number'
                        {...{ register, errors }}
                    />
                </div>
            }

        </div>
    )


    const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
        setIsLoading(true);
        try {
            const url = API + LISTING + CREATE;
            console.log({payload})
            let res = await axios.post(url, payload);
            if (res?.ok) {
                toast.success(NEW_LISTING_CREATED_MESSAGE);
                router?.refresh();
            }
            else {
                toast.error(NEW_LISTING_FAILED_MESSAGE);
            }
        } catch (err) {
            console.log("Error while creating new listing: " + err)

        } finally {
            setIsLoading(false);
        }
    }

    const modifiedOnSubmit = handleSubmit(onSubmit);

    const onClickStep = (type: STEP_TYPES.BACK | STEP_TYPES.NEXT) => {

        if (type === STEP_TYPES.NEXT && userMove === STEPS.PRICE) { // last step
            modifiedOnSubmit({
                category,
                locationValue: location,
                guestCount,
                roomCount,
                bathroomCount,
                imageSrc,
                price,
                title,
                description,
            });
            return;
        }

        if (type === STEP_TYPES.NEXT) {
            setUserMove(prev => prev + 1);
            return;
        }
        setUserMove(prev => prev - 1);
    }

    const getNextStep = () => {
        if (userMove === STEPS.PRICE) {
            return "Create"
        }
        return "Next";
    }

    const getBackStep = () => {
        if (userMove === STEPS.CATEGORY) {
            return ""
        }
        return "Back";
    }

    const handleModalClose = () => {
        setUserMove(STEPS.CATEGORY);
        rentModal.onClose();
    }

    useEffect(() => {
        updateStatesValue('category', getSelectedCategory(params?.get(SELECTED_CATEGORY) as string))
    }, [])

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            onClose={handleModalClose}
            actionLabel={getNextStep()}
            onSubmit={() => onClickStep(STEP_TYPES.NEXT)}
            secondaryActionLabel={getBackStep()}
            secondaryAction={() => onClickStep(STEP_TYPES.BACK)}
            title={`${COMPANY_NAME} your home`}
            body={bodyContent}
        />
    )
}

export default RentModal