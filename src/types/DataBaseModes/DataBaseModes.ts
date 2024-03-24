import { Listing, User } from "@prisma/client";

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

export type CompleteListingDataType = Omit<Listing, "user"> & { user: User };
