import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (
    !body?.title ||
    !body?.description ||
    !body?.imageSrc ||
    !body?.category ||
    !body?.roomCount ||
    !body?.bathroomCount ||
    !body?.location ||
    !body?.price ||
    !body?.guestCount
  ) {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 }
    );
  }

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Not authenticated!" },
        { status: 401 }
      );
    }

    //creating/storing a new airbnb room
    const listing = await prisma.listing.create({
      data: {
        description: body.description,
        imageSrc: body.imageSrc,
        category: body.category,
        roomCount: body.roomCount,
        bathroomCount: body.bathroomCount,
        locationValue: body.location?.value,
        guestCount: body.guestCount,
        title: body.title,
        price: parseInt(body.price, 10),
        userId: user?.id,
      },
    });

    return NextResponse.json(
      { ok: true, message: "New listing has been created!", data: listing },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error while creating new listing: " + err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

interface DeleteListingParms {
  listingId: string;
}

export async function DELETE({ params }: { params: DeleteListingParms }) {
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
      { status: 204 }
    );
  } catch (err: any) {
    console.log("Error while deleting listing: " + err);
    return NextResponse?.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

/*
delete post from listing table
from user favourite id list
from reservation table/collection

*/
