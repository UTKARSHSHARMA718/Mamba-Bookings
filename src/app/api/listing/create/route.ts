import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log({body})
  if (
    !body?.title ||
    !body?.description ||
    !body?.imageSrc ||
    !body?.category ||
    !body?.roomCount ||
    !body?.bathroomCount ||
    !body?.loacation ||
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

    if(!user){
      return NextResponse.json(
        { ok: false, message: "Not authenticated!" },
        { status: 401 }
      );
    }

    const id = user?.id;

    //creating/storing a new airbnb room
    const listing = await prisma.listing.create({
      data: {
        decription: body.description,
        imageSrc: body.imageSrc,
        category: body.category,
        roomCount: body.roomtCount,
        bathroomCount: body.bathroomCount,
        locationValue: body.location,
        guestCount: body.guestCount,
        title: body.title,
        price: body.price,
        userId: id,
      },
    });

    return NextResponse.json(
      { ok: true, message: "New lsiting has been created!", data: listing },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

// id String @id @default(auto()) @map("_id") @db.ObjectId
//   name String?
//   email String? @unique
//   hashsedPassword String?
//   image String?
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   favoritesIds Stri

// id String @id @default(auto()) @map("_id") @db.ObjectId
//   title String
//   decription String
//   imageSrc String
//   createdAt DateTime @default(now())
//   category String
//   roomCount Int
//   bathroomCount Int
//   locationValue String
//   price Int

//   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId String @db.ObjectId

//   reservations Reservation[]
