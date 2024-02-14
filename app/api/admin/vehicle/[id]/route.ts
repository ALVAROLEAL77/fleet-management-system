import { NextRequest, NextResponse } from "next/server";
import models from "../../../../../models";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    let result = await models.Vehicle.findOne({
      where: { id },
      include: {
        model: models.Trip,
        include: {
          model: models.Booking,
          required: true,
        },
      },
    });

    const [lat, lng] = result.currentLocation
      .split(",")
      .map((coord) => parseFloat(coord));

    const mapboxToken = process.env.NEXT_PUBLIC_MAPGL_API;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`;

    const res = await fetch(url);
    const geocodingData = await res.json();

    if (geocodingData.features && geocodingData.features.length > 0) {
      result = {
        ...result.dataValues,
        currentLocationName: geocodingData.features[0].place_name,
      };
    }
    console.log(result.Trips);

    return NextResponse.json(result);
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
    const deleted = await models.Vehicle.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Vehicle ${id} was deleted.` });
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
    const updated = await models.Vehicle.update(
      { ...data },
      {
        where: { id },
      }
    );
    return NextResponse.json({ message: `Vehicle ${id} was updated.` });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
