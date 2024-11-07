import { deleteToken } from "../../hooks/useAuth";
import { NextResponse } from "next/server"

export async function POST(request){
    const myTokenReponse=deleteToken()
    console.log(myTokenReponse)
    return NextResponse.json({}, {status: 200})


}