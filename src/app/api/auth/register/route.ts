import dbConnection from "@/db/connection"
import User from "@/models/user"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const  {fullname: name, email, password} = await request.json()
    console.log('DATA > POST >>',{name, email, password})

    await dbConnection()
    await User.create({name, email, password})

    return NextResponse.json({msg: `User ${name} with email ${email} was registred successfully`}, {status:201})

}