export const MAX_ROOM_LIMIT = 50;
export const MAX_GUEST_LIMIT = 30;
export const MAX_BATHROOM_LIMIT = 10;
export const MIN_ROOM_LIMIT = 1;
export const MIN_GUEST_LIMIT = 1;
export const MIN_BATHROOM_LIMIT = 1;

export const getCountersInfo = ({
  updateStatesValue,
  bathroomCount,
  roomCount,
  guestCount,
}: {
  updateStatesValue: (v: string, k: number) => void;
  bathroomCount: number;
  roomCount: number;
  guestCount: number;
}) => {
  return [
    {
      label: "Bathroom",
      value: bathroomCount,
      onAdd: () => updateStatesValue("bathroomCount", bathroomCount + 1),
      onSub: () => updateStatesValue("bathroomCount", bathroomCount - 1),
      isAddDisabled: bathroomCount === MAX_BATHROOM_LIMIT,
      isSubDisabled: bathroomCount === MIN_BATHROOM_LIMIT,
    },
    {
      label: "Room",
      value: roomCount,
      onAdd: () => updateStatesValue("roomCount", roomCount + 1),
      onSub: () => updateStatesValue("roomCount", roomCount - 1),
      isAddDisabled: roomCount === MAX_ROOM_LIMIT,
      isSubDisabled: roomCount === MIN_ROOM_LIMIT,
    },
    {
      label: "Guest",
      value: guestCount,
      onAdd: () => updateStatesValue("guestCount", guestCount + 1),
      onSub: () => updateStatesValue("guestCount", guestCount - 1),
      isAddDisabled: guestCount === MAX_GUEST_LIMIT,
      isSubDisabled: guestCount === MIN_GUEST_LIMIT,
    },
  ];
};
