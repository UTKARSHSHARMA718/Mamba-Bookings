import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { Reservation } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating, listingId, userId, review } = body;
    if (!rating || !listingId || rating < 0 || rating > 5 || !review) {
      return NextResponse.json(
        { ok: false, message: "Invalid request!", data: null },
        { status: 400 }
      );
    }

    const usersAllReservations = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        reservations: true,
      },
    });

    if (!usersAllReservations) {
      return NextResponse.json(
        { ok: false, message: "Invalid request!", data: null },
        { status: 400 }
      );
    }

    const doesUserAlreadySubmittedRating = await prisma.rating.findMany({
      where: {
        userId,
        listingId,
      },
    });

    if (doesUserAlreadySubmittedRating) {
      return NextResponse.json(
        {
          ok: false,
          message: "User has already submitted the review!",
          data: null,
        },
        { status: 400 }
      );
    }

    const currentPropertyReservations =
      usersAllReservations?.reservations?.filter(
        (reservation: Reservation) => reservation.listingId === listingId
      );

    const isAllowedToGiveRating = currentPropertyReservations?.find(
      (reservation: Reservation) => {
        return reservation?.endDate < new Date();
      }
    );

    if (!isAllowedToGiveRating) {
      return NextResponse.json(
        { ok: false, message: "Not allowed to rate the property!", data: null },
        { status: 400 }
      );
    }

    const listingOwner = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      select: {
        userId: true,
      },
    });

    if (listingOwner === userId) {
      return NextResponse.json(
        {
          ok: false,
          message: "Owner is not allowed to rate the property!",
          data: null,
        },
        { status: 400 }
      );
    }

    const result = await prisma.rating.create({
      data: {
        rating,
        listingId,
        userId,
        review,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Succesfully updated the rating!", data: result },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("Error while updating rating: " + err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong!", data: null },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { rating, review, ratingId } = body;

    if (!ratingId || typeof ratingId !== "string" || !rating || !review) {
      return NextResponse.json(
        { ok: false, message: "Invalid request!", data: null },
        { status: 400 }
      );
    }

    const ratingObj = await prisma.rating.update({
      where: {
        id: ratingId,
      },
      data: {
        rating,
        review,
      },
    });

    return NextResponse.json(
      { ok: true, message: "Rating updated successfully!", data: ratingObj },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("Error while updating rating: " + err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong!", data: null },
      { status: 500 }
    );
  }
}
