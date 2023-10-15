import { NextRequest, NextResponse } from "next/server";
import models from "../../../../models";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const result = await models.Route.findOne({ where: { id } });
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
    const deleted = await models.Route.destroy({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: `Route ${id} was deleted.` });
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
    const updated = await models.Route.update(
      { ...data },
      {
        where: { id },
      }
    );
    return NextResponse.json({ message: `Route ${id} was updated.` });
  } catch (e) {
    return NextResponse.json({ message: e.message, status: 400 });
  }
}
