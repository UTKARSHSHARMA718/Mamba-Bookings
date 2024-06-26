import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismaDB";
import { ROUNDES_FOR_HASHING_PASSWORD } from "@/constants/const";
import { humanReadableDateFormate } from "@/libs/utils/util";
import { sendMail, sendMailForNewUserCreation } from "@/libs/mail/sendMail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.password) {
      return NextResponse?.json(
        {
          ok: false,
          message: "Invalid request!",
          data: null,
        },
        { status: 400 }
      );
    }

    const userEmail = await prisma.user?.findMany({
      where: {
        email: {
          equals: body?.email,
          mode: "insensitive",
        },
      },
    });

    if(userEmail?.length){
      return NextResponse?.json(
        {
          ok: false,
          message: "Email is already exist.",
          data: null,
        },
        { status: 400 }
      );
    }

    // NOTE: generating hashed password
    const hashedPasswordFromBrcypt = await bcrypt?.hash(
      body.password,
      ROUNDES_FOR_HASHING_PASSWORD
    );

    //NOTE: creating user into our database
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashsedPassword: hashedPasswordFromBrcypt,
      },
    });

    if (!user) {
      return NextResponse?.json(
        {
          ok: false,
          message: "Unable to create user!",
          data: null,
        },
        { status: 500 }
      );
    }

    //trigger a new mail to the owner of the account in-order to notify him/her
    const htmlTemplateForNewCustomer = sendMailForNewUserCreation({
      accountName: user?.name,
      accountEmail: user?.email,
      date: humanReadableDateFormate(`${user?.createdAt}`),
    });
    await sendMail({
      to: user?.email || "No email available",
      name: user?.name || "No name available",
      subject: "New Account created successfully",
      body: htmlTemplateForNewCustomer,
    });

    return NextResponse?.json(
      {
        ok: true,
        message: "User has been created!",
        data: user,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log("Error while creating new user: " + err);
    return NextResponse?.json(
      {
        ok: false,
        message: "Something went wrong!",
        data: null,
      },
      { status: 500 }
    );
  }
}
