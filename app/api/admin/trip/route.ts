// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../../models";
import mapboxgl from "mapbox-gl";

export async function GET() {
  try {
    const result = await models.Trip.findAll({
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPGL_API as string;

  try {
    const data = await req.json();
    let booking = await models.Booking.findOne({
      where: { id: data.bookingId },
    });
    const reqDis = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${booking.startLocation
        .split(",")
        .reverse()
        .join()};${booking.endLocation
        .split(",")
        .reverse()
        .join()}?access_token=${mapboxgl.accessToken}`
    );
    booking = await reqDis.json();

    const result = await models.Trip.create({
      id: v4(),
      ...data,
      distanceTraveled: booking.routes[0].distance,
    });
    return NextResponse.json({ result: result, message: "Created" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
