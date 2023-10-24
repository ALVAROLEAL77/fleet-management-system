import { NextRequest, NextResponse } from "next/server";
import models from "../../../../models";
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
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
    const res = await fetch(url);
    const address = await res.json();

    if (address.status === "OK" && address.results.length > 0) {
      result = {
        ...result.dataValues,
        currentLocationName: address.results[0].formatted_address,
      };
    }
    console.log(result.Trips);
    // if (result.Trips) {
    //   const trips = [];
    //   for (let Trip of result.Trips) {
    //     const [startLat, startLng] = Trip.Booking.startLocation
    //       .split(",")
    //       .map((coord) => parseFloat(coord));
    //     const [endLat, endLng] = Trip.Booking.endLocation
    //       .split(",")
    //       .map((coord) => parseFloat(coord));
    //     const startUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${startLat},${startLng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
    //     const endUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${endLat},${endLng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
    //     const res1 = await Promise.all([fetch(startUrl), fetch(endUrl)]);
    //     const [startAddress, endAddress] = await Promise.all([
    //       res1[0].json(),
    //       res1[1].json(),
    //     ]);
    //     if (
    //       startAddress.status === "OK" &&
    //       startAddress.results.length > 0 &&
    //       endAddress.status === "OK" &&
    //       endAddress.results.length > 0
    //     ) {
    //       result = {
    //         ...result.dataValues.Trip.Booking,
    //         startLocationName: startAddress.results[0].formatted_address,
    //         endLocationName: endAddress.results[0].formatted_address,
    //       };
    //     }
    //   }
    // }
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
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
    return NextResponse.json({ message: e.message, status: 400 });
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
    return NextResponse.json({ message: e.message, status: 400 });
  }
}
