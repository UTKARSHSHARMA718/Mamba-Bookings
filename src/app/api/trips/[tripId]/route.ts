import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface ITrips {
  params: {
    tripId: string;
  };
}

export async function DELETE(req: NextApiRequest, { params }: ITrips) {
  try {
    const tripId = params?.tripId;

    if (!tripId || typeof tripId !== "string") {
      return NextResponse?.json(
        { ok: false, message: "Invalid request!", data: null },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse?.json(
        { ok: false, message: "Something went wrong!", data: null },
        { status: 500 }
      );
    }

    const res = await prisma?.reservation?.deleteMany({
      where: {
        userId: user.id,
        id: tripId,
      },
    });

    return NextResponse?.json(
      { ok: true, message: "Trip has been deleted successfully!", data: res },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("Error while deleting trip: " + err);
    return NextResponse?.json(
      { ok: false, message: "Something went wrong!", data: null },
      { status: 500 }
    );
  }
}
