import { NextRequest, NextResponse } from "next/server";
import models from "../../../../../models";
import jwt from "jsonwebtoken"; // Import JWT module

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get("authorization") as string | undefined;

    if (!authHeader) {
      return NextResponse.json(
        { message: "Authorization header not provided" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    if (decoded.userId) {
      const { id } = await params;
      let result = await models.Booking.findOne({
        where: { id },
        include: { model: models.Customer },
      });
      const mapboxToken = process.env.NEXT_PUBLIC_MAPGL_API;

      const [startLat, startLng] = result.startLocation
        .split(",")
        .map((coord) => parseFloat(coord));
      const [endLat, endLng] = result.endLocation
        .split(",")
        .map((coord) => parseFloat(coord));

      const startUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${startLng},${startLat}.json?access_token=${mapboxToken}`;
      const startRes = await fetch(startUrl);
      const startAddressData = await startRes.json();

      const endUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${endLng},${endLat}.json?access_token=${mapboxToken}`;
      const endRes = await fetch(endUrl);
      const endAddressData = await endRes.json();

      if (
        startAddressData.features.length > 0 &&
        endAddressData.features.length > 0
      ) {
        result = {
          ...result.dataValues,
          startLocationName: startAddressData.features[0].place_name,
          endLocationName: endAddressData.features[0].place_name,
        };
      }

      return NextResponse.json(result);
    } else {
      throw new Error("not Authorized");
    }
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const deleted = await models.Booking.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Booking ${id} was deleted.` });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const updated = await models.Booking.update(
      { ...data },
      {
        where: { id },
      }
    );
    return NextResponse.json({ message: `Booking ${id} was updated.` });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
