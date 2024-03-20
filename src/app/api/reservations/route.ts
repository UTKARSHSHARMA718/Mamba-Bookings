import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (
      !body ||
      !body?.totalPrice ||
      !body?.startDate ||
      !body?.endDate ||
      !body?.listingId
    ) {
      return NextResponse.json(
        { ok: false, message: "Inavlid request!" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Something went wrong!" },
        { status: 500 }
      );
    }

    const res = await prisma?.listing?.update({
      where: {
        id: body?.listingId,
      },
      data: {
        reservations: {
          create: {
            totalPrice: body?.totalPrice,
            startDate: body?.startDate,
            endDate: body?.endDate,
            userId: user?.id,
          },
        },
      },
    });

    return NextResponse.json(
      { ok: true, message: "New reservation has created!", data: res },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error while creating new reservation: " + err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
