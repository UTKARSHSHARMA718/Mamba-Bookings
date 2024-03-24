import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { redis } from "@/libs/redis/redis";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  reservationId: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  if (!params?.reservationId) {
    return NextResponse.json(
      { ok: false, message: "Inavlid request!" },
      { status: 400 }
    );
  }

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { ok: false, message: "Something went wrong!" },
        { status: 500 }
      );
    }
    const { reservationId } = params;
    const res = await prisma?.reservation?.deleteMany({
      where: {
        id: reservationId,
        //NOTE: Only the booker and the owner should be allowed to delete the reservation of any property
        OR: [
          { userId: currentUser?.id }, // booker
          { listing: { userId: currentUser?.id } }, // owner
        ],
      },
    });

    const cacheKey = JSON.stringify({ userId: currentUser?.id });
    await redis?.del(cacheKey);

    return NextResponse.json(
      {
        ok: true,
        message: "Reservation has been deleted successfully!",
        data: res,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error while deleting reservation: " + err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
