import {cookies} from "next/headers"
import { verify } from "jsonwebtoken";
import { COOKIE_NAME} from "@/constant"
import { NextResponse } from "next/server";
import User from '@/models/user'



export const GET = async ()=>{
    const cookieStore = cookies()

    const jwtToken = cookieStore.get(COOKIE_NAME)

    if(!jwtToken) {
        return NextResponse.json({msg: "Unauthorized"}, {status:401})
    }

    const {value} = jwtToken;
    const jwtSecret = process.env.JWT_SECRET || "";

    

    try {
       
        const result = await verify(value,jwtSecret)
        console.log('profile > result >', result)

        const userFromDB = await User.findOne({email: result.email})

        const response = {user: {email: userFromDB.email, name: userFromDB.name}}

        return NextResponse.json(response, {status:200})
        
    } catch(error){
        return NextResponse.json({msg: "Unauthorized"}, {status:401})
    }

}