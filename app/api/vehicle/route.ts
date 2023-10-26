// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../models";
export async function GET() {
  try {
    let results = await models.Vehicle.findAll({});
    results = await Promise.all(
      results.map(async (result) => {
        const [lat, lng] = result.currentLocation
          .split(",")
          .map((coord) => parseFloat(coord));
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GMAPS_API}`;
        const res = await fetch(url);
        const address = await res.json();
        if (address.status === "OK" && address.results.length > 0) {
          return {
            ...result.dataValues,
            currentLocationName: address.results[0].formatted_address,
          };
        }
      })
    );

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await models.Vehicle.create({
      id: v4(),
      ...data,
    });
    return NextResponse.json({ result: result, message: "Created" });
  } catch (e) {
    return NextResponse.json({ message: e, status: 400 });
  }
}
