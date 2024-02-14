// Import necessary modules and dependencies
import { NextRequest, NextResponse } from "next/server";
import models from "../../../../models";
import jwt from "jsonwebtoken"; // Import JWT module
import { compareSync } from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const User = await models.User.findOne({
      where: {
        email: data?.email,
      },

      include: [
        //@ts-ignore
        {
          model: models.Driver,
          required: false,
        },
      ],
    });
    console.log(User);
    if (User != null && compareSync(data?.password as string, User.password)) {
      const token = jwt.sign({ userId: User.id }, process.env.NEXTAUTH_SECRET, {
        expiresIn: "1d",
      });
      return NextResponse.json({
        token,
        driver: User.Driver,
        message: "Token generated successfully",
      });
    } else if (
      User != null &&
      !compareSync(data?.password as string, User.password)
    ) {
      throw new Error("invalid password.");
    } else {
      throw new Error("account doesn't exist.");
    }
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 400 });
  }
}
