// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../../models";
export async function GET() {
  try {
    let results = await models.Booking.findAll({
      order: [["createdAt", "DESC"]],
    });
    results = await Promise.all(
      results.map(async (result) => {
        const [startLat, startLng] = result.startLocation
          .split(",")
          .map((coord) => parseFloat(coord));
        const [endLat, endLng] = result.endLocation
          .split(",")
          .map((coord) => parseFloat(coord));
        const startUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${startLat},${startLng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
        const endUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${endLat},${endLng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
        const res = await Promise.all([fetch(startUrl), fetch(endUrl)]);
        const [startAddress, endAddress] = await Promise.all([
          res[0].json(),
          res[1].json(),
        ]);

        if (
          startAddress.status === "OK" &&
          startAddress.results.length > 0 &&
          endAddress.status === "OK" &&
          endAddress.results.length > 0
        ) {
          result = {
            ...result.dataValues,
            startLocationName: startAddress.results[0].formatted_address,
            endLocationName: endAddress.results[0].formatted_address,
          };
        }
        return result;
      })
    );

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await models.Booking.create({
      id: v4(),
      ...data,
    });
    return NextResponse.json({ result: result, message: "Created" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
