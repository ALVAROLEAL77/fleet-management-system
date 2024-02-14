// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../../models";
export async function GET() {
  try {
    let results = await models.Vehicle.findAll({
      order: [["createdAt", "DESC"]],
    });
    results = await Promise.all(
      results.map(async (result) => {
        const [lat, lng] = result.currentLocation
          .split(",")
          .map((coord) => parseFloat(coord));
        const mapboxToken = process.env.NEXT_PUBLIC_MAPGL_API;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`;
        const res = await fetch(url);
        const geocodingData = await res.json();
        if (geocodingData.features && geocodingData.features.length > 0) {
          return {
            ...result.dataValues,
            currentLocationName: geocodingData.features[0].place_name,
          };
        }
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
    const result = await models.Vehicle.create({
      id: v4(),
      ...data,
    });
    return NextResponse.json({ result: result, message: "Created" });
  } catch (e) {
    return NextResponse.json({ message: e, status: 400 });
  }
}
