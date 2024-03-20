import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismaDB";


interface IParams{
    listingId?: string;
}

export async function PUT(req: NextRequest, {params}: {params: IParams}) {
  const listingId = params?.listingId as string;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse?.json(
        { ok: false, message: "Not authenticated!", data: null },
        { status: 401 }
      );
    }

    let favouriteListingArray = user.favoritesIds;
    favouriteListingArray = [listingId, ...(favouriteListingArray || [])];

    const updatedUser = await prisma?.user?.update({
      where: {
        email: user.email!,
      },
      data: {
        favoritesIds: favouriteListingArray,
      },
    });

    return NextResponse?.json(
      { ok: true, message: "User info has updated!", data: updatedUser },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error: " + err);
    return NextResponse?.json(
      { ok: false, message: "Something went wrong!", data: null },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, {params}: {params: IParams}) {
    const listingId = params?.listingId as string;
  
    try {
      const user = await getCurrentUser();
  
      if (!user) {
        return NextResponse?.json(
          { ok: false, message: "Not authenticated!", data: null },
          { status: 401 }
        );
      }
  
      let favouriteListingArray = user.favoritesIds;
      favouriteListingArray = favouriteListingArray?.filter(id=> id!==listingId);
  
      const updatedUser = await prisma?.user?.update({
        where: {
          email: user.email!,
        },
        data: {
          favoritesIds: favouriteListingArray,
        },
      });
  
      return NextResponse?.json(
        { ok: true, message: "User info has updated!", data: updatedUser },
        { status: 201 }
      );
    } catch (err) {
      console.log("Error: " + err);
      return NextResponse?.json(
        { ok: false, message: "Something went wrong!", data: null },
        { status: 500 }
      );
    }
  }
  