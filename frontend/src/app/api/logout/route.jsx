import { deleteToken } from "../../hooks/useAuth";
import { NextResponse } from "next/server"

//Delete Authentication Token after a logout
export async function POST(request){
    const myTokenReponse=deleteToken()
    console.log(myTokenReponse)
    return NextResponse.json({}, {status: 200})
}