import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME} from "@/constant"
import User from '@/models/user'

const MAX_AGE = 60 * 60 * 24 * 30;

export const POST = async (request: Request) => {
  const body: any = request.json();
  const { email, password } = await body;
  console.log('body', body)

  const user = await User.findOne({email, password})

  if (!user) {
    return NextResponse.json({ msg: "invalid credentials" }, { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET || "";

  const jwtToken = sign({ email }, jwtSecret, { expiresIn: MAX_AGE });


  const serializeToken = serialize(COOKIE_NAME, jwtToken, {
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: '/'
  });

  const response = {msg: "Authentication successfull"}

  return new Response(JSON.stringify(response), 
    {
      status:200, 
      headers:
        {
          'Set-Cookie': serializeToken
        }
    })
};
