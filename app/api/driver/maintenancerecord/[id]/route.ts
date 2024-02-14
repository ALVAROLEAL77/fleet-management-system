import { NextRequest, NextResponse } from "next/server";
import models from "../../../../../models";
import jwt from "jsonwebtoken";

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
      const result = await models.MaintenanceRecord.findOne({
        where: { vehicleId: id },
        include: { model: models.Vehicle },
      });
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
      const deleted = await models.MaintenanceRecord.destroy({
        where: {
          id,
        },
      });
      return NextResponse.json({
        message: `Maintenance Record ${id} was deleted.`,
      });
    } else {
      throw new Error("not Authorized");
    }
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
    const updated = await models.MaintenanceRecord.update(
      { ...data },
      {
        where: { id },
      }
    );
    return NextResponse.json({
      message: `Maintenance Record ${id} was updated.`,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
