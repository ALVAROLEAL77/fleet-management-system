import { NextRequest, NextResponse } from "next/server";
import models from "../../../../../models";
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadius = 6371; // Earth's radius in kilometers

  const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Reverse geocoding for start location
    const startUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${startLng},${startLat}.json?access_token=${mapboxToken}`;
    const startRes = await fetch(startUrl);
    const startAddressData = await startRes.json();

    // Reverse geocoding for end location
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
