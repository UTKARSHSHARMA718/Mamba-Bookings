import { Listing, Rating, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type ListingPayload = {
  id?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  createdAt?: Date;
  category?: string;
  roomCount?: number;
  bathroomCount?: number;
  guestCount?: number;
  locationValue?: string;
  price?: number;
  userId?: string;
};

export type CompleteListingDataType = Omit<Listing, "user"> & { user: User } & {
  ratings: Rating[];
};
export type CompleteReservationDataType = Reservation & { listing: Listing };

export type UserWithReservation = SafeUser & { reservations: Reservation[] };

export type CompleteRatingData = Omit<Rating, "user"> & {user: User}