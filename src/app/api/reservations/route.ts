import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { currencyNumberFormatter } from "../../../libs/utils/util";
import { humanReadableDateFormate } from "@/libs/utils/util";
import {
  sendMail,
  sendMailForSuccessfulReservation,
} from "@/libs/mail/sendMail";

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
      include: {
        user: true,
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

    //trigger an email to customer and one to owner for notifying them about the new reservation.
    const htmlTemplateForCustomer = sendMailForSuccessfulReservation(
      {
        propertyName: res?.title,
        startDate: humanReadableDateFormate(`${body?.startDate}`),
        endDate: humanReadableDateFormate(`${body?.endDate}`),
        totalPrice: currencyNumberFormatter(body?.totalPrice),
      },
      "customer"
    );
    await sendMail({
      to: user?.email || "No email available",
      name: user?.name || "No name available",
      subject: "Reservation Confirmed",
      body: htmlTemplateForCustomer,
    });

    const htmlTemplateForOwner = sendMailForSuccessfulReservation(
      {
        propertyName: res?.title,
        startDate: humanReadableDateFormate(`${body?.startDate}`),
        endDate: humanReadableDateFormate(`${body?.endDate}`),
        totalPrice: currencyNumberFormatter(body?.totalPrice),
      },
      "owner"
    );
    await sendMail({
      to: res?.user?.email || "No email available",
      name: res?.user?.name || "No name available",
      subject: "New Reservation",
      body: htmlTemplateForOwner,
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
