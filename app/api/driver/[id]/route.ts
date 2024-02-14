import { NextRequest, NextResponse } from "next/server";
import models from "../../../../models";
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
      const result = await models.Driver.findOne({ where: { id } });
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
    const deleted = await models.Driver.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Driver ${id} was deleted.` });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
export async function PUT(
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
      const data = await req.json();
      const updated = await models.Driver.update(
        { ...data },
        {
          where: { id },
        }
      );
      if (updated > 0) {
        const record = await models.Driver.findOne({ where: { id } });
        return NextResponse.json(record);
      } else {
        return NextResponse.json(
          { message: "no records has been updated" },
          { status: 404 }
        );
      }
    } else {
      throw new Error("not Authorized");
    }
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
