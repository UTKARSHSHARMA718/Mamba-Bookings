import { Range, RangeKeyDict } from "react-date-range";
import { CountrySelectValue } from "../CountrySelect/CountrySelectTypes";

export type DateRangeTypes = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type CalendarTypes = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDate?: Range[];
};

export type CountrySelectValueType = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

export type MapTypes = {
  center?: number[];
};

export type SelectGuestRoomBathRoomCountProps = {
  bathroomsCount: number;
  roomsCount: number;
  guestCount: number;
  setBathroomsCount: (prev: any) => void;
  setRoomCount: (prev: any) => void;
  setGuestCount: (prev: any) => void;
};
