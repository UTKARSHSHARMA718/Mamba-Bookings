'use client'

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import qs from "query-string";
import { formatISO } from 'date-fns';

import Button from '@/components/Button/Button';
import CalenderScreen from '../FilterModalsScreens/CalenderScreen/CalenderScreen';
import LocationScreen from '../FilterModalsScreens/LocationScreen/LocationScreen';
import Modal from '@/components/Modal/Modal';
import SelectGuestRoomBathRoomCount from '../FilterModalsScreens/SelectGuestRoomBathRoomCount/SelectGuestRoomBathRoomCount';
import useQueryParams from '@/hooks/useQueryParams';
import useRemoveFilter from '@/hooks/useRemoveFilter';
import useSearchModal from '@/hooks/useSearchModalt'
import { CountrySelectValue } from '@/types/CountrySelect/CountrySelectTypes';
import { STEPS } from '@/enums/SearchModalEnum';
import { initialDateRange } from '@/constants/const';

const SearchModal = () => {
    const router = useRouter();

    const [dateRange, setDateRange] = useState(initialDateRange);
    const [location, setLocation] = useState<CountrySelectValue>({
        flag: "",
        label: "",
        latlgn: [],
        region: "",
        value: "",
    });
    const [guestCount, setGuestCount] = useState(1);
    const [roomsCount, setRoomCount] = useState(1);
    const [bathroomsCount, setBathroomsCount] = useState(1);

    const { onVisible } = useRemoveFilter();
    const { isOpen, screenNo, setScreen, onClose } = useSearchModal();
    const { getQueryParams } = useQueryParams();


    const handleApplyFilter = useCallback(() => {
        let value: any = getQueryParams();
        if (guestCount && !isNaN(guestCount) && +guestCount > 1) {
            value.guest = guestCount;
        }
        if (roomsCount && !isNaN(roomsCount) && +roomsCount > 1) {
            value.rooms = roomsCount;
        }
        if (bathroomsCount && !isNaN(bathroomsCount) && +bathroomsCount > 1) {
            value.bathrooms = bathroomsCount;
        }
        if (location?.value) {
            value.location = location?.value;
        }
        if (dateRange?.startDate && dateRange?.endDate) {
            value.startDate = formatISO(dateRange?.startDate);
            value.endDate = formatISO(dateRange?.endDate);
        }
        const queryString = qs.stringifyUrl({
            url: "/",
            query: value,
        });
        router?.push(queryString);
        onVisible();
        onClose();
    }, [
        qs?.stringifyUrl,
        guestCount,
        roomsCount,
        bathroomsCount,
        location,
        router?.push,
        onClose,
        onVisible,
        dateRange?.startDate,
        dateRange?.endDate,
    ]);

    const bodyContent = (
        <div className="
            flex
            flex-col
            gap-2
        ">
            {screenNo === STEPS.LOCATION &&
                <LocationScreen
                    value={location}
                    onChange={(value) => setLocation(value as CountrySelectValue)}
                    center={location?.latlgn}
                />
            }
            {screenNo === STEPS.DAYS &&
                <CalenderScreen
                    value={dateRange}
                    onChange={setDateRange}
                />
            }
            {screenNo === STEPS.GUESTS &&
                <SelectGuestRoomBathRoomCount {...{
                    bathroomsCount,
                    roomsCount,
                    guestCount,
                    setGuestCount,
                    setRoomCount,
                    setBathroomsCount
                }} />
            }
            <Button
                label='Apply Filters'
                onClick={handleApplyFilter}
            />
        </div>)

    const backBtn = useMemo(() => {
        if (screenNo !== STEPS.LOCATION) {
            return "Back"
        }
        return "";
    }, [screenNo]);

    const nextBtn = useMemo(() => {
        if (screenNo !== STEPS.GUESTS) {
            return "Next"
        }
        return "";
    }, [screenNo]);

    return (
        <Modal
            {...{ onClose, isOpen }}
            onClose={onClose}
            onSubmit={() => setScreen(screenNo + 1)}
            title="Search Filter"
            body={bodyContent}
            secondaryActionLabel={backBtn}
            actionLabel={nextBtn}
            secondaryAction={() => setScreen(screenNo - 1)}
        />
    )
}

export default SearchModal