import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../../../models";
import jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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
      const result = await models.Trip.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          driverId: id,
        },
        include: [
          //@ts-ignore
          {
            model: models.Booking,
            required: false,
          },
          //@ts-ignore
          {
            model: models.Vehicle,
            required: false,
          },
        ],
      });

      return NextResponse.json(result);
    } else {
      throw new Error("not Authorized");
    }
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
