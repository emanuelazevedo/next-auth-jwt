import { serialize } from "cookie";
import { COOKIE_NAME} from "@/constant"

export const GET = async (request: Request) => {
    
  
    
  
    const serializeToken = serialize(COOKIE_NAME, "", {
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: '/'
    });
  
    const response = {msg: "Logout successfull"}
  
    return new Response(JSON.stringify(response), 
      {
        status:200, 
        headers:
          {
            'Set-Cookie': serializeToken
          }
      })
  };