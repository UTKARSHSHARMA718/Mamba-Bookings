import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/libs/prismaDB";
import { ROUNDES_FOR_HASHING_PASSWORD } from "@/constants/const";

export async function POST(req: NextRequest) {
  const body = await req.json();

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
   return NextResponse?.json({
      ok: false,
      message: "Unable to create user!",
      data: null,
    });
  }

  return NextResponse?.json({
    ok: true,
    message: "user has been created!",
    data: user,
  });
}
