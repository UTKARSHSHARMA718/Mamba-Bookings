import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface ListingParams {
  listingId: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: ListingParams }
) {
  try {
    const { listingId } = params;
    const user = await getCurrentUser();

    if (!listingId) {
      return NextResponse?.json(
        { ok: false, message: "Invalid request!" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse?.json(
        { ok: false, message: "Something went wrong!" },
        { status: 500 }
      );
    }

    const res = await prisma.listing.deleteMany({
      // Want to make sure only the owner of the property able to delete it.
      where: {
        id: listingId,
        userId: user.id,
      },
    });

    return NextResponse?.json(
      { ok: true, message: "Listing deleted successfully!", data: res },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("Error while deleting listing: " + err);
    return NextResponse?.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: ListingParams }
) {
  try {
    const { listingId } = params;
    const user = await getCurrentUser();
    const body = await req.json();

    if (!listingId) {
      return NextResponse?.json(
        { ok: false, message: "Invalid request!" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse?.json(
        { ok: false, message: "Something went wrong!" },
        { status: 500 }
      );
    }

    const res = await prisma.listing.updateMany({
      // Want to make sure only the owner of the property able to update the details.
      where: {
        id: listingId,
        userId: user.id,
      },
      data: {
        description: body?.description || undefined,
        imageSrc: body?.imageSrc || undefined,
        category: body?.category || undefined,
        roomCount: body?.roomCount || undefined,
        bathroomCount: body?.bathroomCount || undefined,
        locationValue: body?.location?.value || undefined,
        guestCount: body?.guestCount || undefined,
        title: body?.title || undefined,
        price: body?.price ? parseInt(body?.price, 10) : undefined,
        userId: user?.id || undefined,
      },
    });

    return NextResponse?.json(
      { ok: true, message: "Listing updated successfully!", data: res },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("Error while updating listing: " + err);
    return NextResponse?.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
