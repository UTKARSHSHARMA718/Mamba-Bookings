'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/dist/client/components/navigation'
import axios from 'axios'

import CategoryInput from '@/components/CategoryInput/CategoryInput'
import Counter from '@/components/Counter/Counter'
import CountrySelect from '@/components/CountrySelect/CountrySelect'
import Heading from '@/components/Headers/Heading'
import Input from '@/components/Input/Input'
import Map from '@/components/Map/Map'
import Modal from '@/components/Modal/Modal'
import UplaodImage from '@/components/UplaodImage/UplaodImage'
import useLocalStoarge from '@/hooks/useLocalStorage'
import useQueryParams from '@/hooks/useQueryParams'
import useRentModal from '@/hooks/useRentModal'
import { STEPS, STEP_TYPES } from '@/enums/RentModalEnum'
import { getCountersInfo } from './RentModalConfig'
import { CountrySelectValue } from '@/types/CountrySelect/CountrySelectTypes'
import { compareString } from '@/libs/utils/util'
import { RENT_MODAL_DATA, VALID_RENT_SCREEN, categoriesToRender } from '@/constants/const'
import { API, LISTING } from '@/constants/apiEndpoints'
import { NEW_LISTING_CREATED_MESSAGE, NEW_LISTING_FAILED_MESSAGE } from '@/constants/generalMessage'
import { RENT_MODAL_DATA_STRUCTURE } from '../../constants/const';



const RentModal: React.FC = () => {
    const router = useRouter();
    const params = useSearchParams();
    const currentPath = usePathname();

    const [isLoading, setIsLoading] = useState(false);
    const [userMove, setUserMove] = useState(0);

    const rentModal = useRentModal();

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

    const { storeValues, removeItems, getValues } = useLocalStoarge();
    const { removeQuery, setQueryParams } = useQueryParams();
    const isEditMode = params?.get("rent-modal") === "edit";

    const updateStatesValue = (id: string, value: string | number | CountrySelectValue) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const CountersInfo = getCountersInfo({ updateStatesValue, bathroomCount, guestCount, roomCount });



    const handleOnUpload = (uploadImagString: string) => {
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
                                    onClick={() => updateStatesValue("category", item?.label)}
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
                    <CountrySelect
                        value={location}
                        onChange={(value) => updateStatesValue('location', value)}
                    />
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

    const handleModalClose = () => {
        reset();
        removeQuery({ key: ["screen", "rent-modal"], currentUrl: currentPath || "" });
        removeItems(RENT_MODAL_DATA);
        setUserMove(0);
        rentModal.onClose();
    }

    const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
        setIsLoading(true);
        try {
            let url = API + LISTING;
            let res;
            if (isEditMode) {
                const listingId = currentPath?.split("/")[2];
                url = "/" + url + `/${listingId}`
                res = await axios.patch(url, payload);
            }
            else {
                res = await axios.post(url, payload);
            }
            if (res?.data?.ok) {
                toast.success(isEditMode ? "Updated listing successfully!" : NEW_LISTING_CREATED_MESSAGE);
                handleModalClose();
                router?.refresh();
            }
            else {
                toast.error(isEditMode ? "Error occured while updating listing" : NEW_LISTING_FAILED_MESSAGE);
            }
        } catch (err) {
            console.log(`Error while ${isEditMode ? "updating" : "creating"} new listing: ` + err)

        } finally {
            setIsLoading(false);
        }
    }

    const modifiedOnSubmit = handleSubmit(onSubmit);

    const updateLocalDataFromCurrentState = () => {
        let updatedData: any = {};
        for (let key in RENT_MODAL_DATA_STRUCTURE) {
            updatedData[key] = watch(key)
        }
        storeValues(RENT_MODAL_DATA, updatedData);
    }

    const onClickNextOrBack = (type: STEP_TYPES.BACK | STEP_TYPES.NEXT) => {

        if (type === STEP_TYPES.NEXT && userMove === STEPS.PRICE) { // last step
            modifiedOnSubmit({
                // @ts-ignore
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
            setQueryParams({
                queryName: "screen",
                value: `${userMove + 1}`,
                currentUrl: currentPath || "",
            });
            updateLocalDataFromCurrentState();
            return;
        }
        setUserMove(prev => prev - 1);
        setQueryParams({
            queryName: "screen",
            value: `${userMove - 1}`
        });
        updateLocalDataFromCurrentState();
    }

    const getNextStep = () => {
        if (userMove === STEPS.PRICE) {
            if (isEditMode) {
                return "Update";
            }
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

    useEffect(() => {
        let localData = getValues(RENT_MODAL_DATA);
        if (localData) {
            for (let key in localData) {
                updateStatesValue(key, localData[key]);
            }
        }
    }, [rentModal?.isOpen])

    useEffect(() => {
        const rentModalParams = params?.get("rent-modal");
        const screen = params?.get("screen");
        if (rentModalParams && (compareString(rentModalParams, "open") || compareString(rentModalParams, "edit"))) {
            rentModal?.onOpen();
        }
        if (screen && VALID_RENT_SCREEN?.includes(Number(screen))) {
            setUserMove(+screen);
        }
    }, [])

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            onClose={handleModalClose}
            actionLabel={getNextStep()}
            onSubmit={() => onClickNextOrBack(STEP_TYPES.NEXT)}
            secondaryActionLabel={getBackStep()}
            secondaryAction={() => onClickNextOrBack(STEP_TYPES.BACK)}
            title={isEditMode ? "Update details" : 'Add your home'}
            body={bodyContent}
        />
    )
}

export default RentModal