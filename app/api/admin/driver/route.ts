// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import models from "../../../../models";
export async function GET() {
  try {
    const result = await models.Driver.findAll({
      order: [["createdAt", "DESC"]],
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await models.Driver.create({
      id: v4(),
      ...data,
    });
    console.log(result);
    return NextResponse.json({ result: result, message: "Created" });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
