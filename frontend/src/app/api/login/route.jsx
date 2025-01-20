"use server";

import { getToken, setRefreshToken, setToken } from "../../hooks/useAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = process.env.NEXT_PUBLIC_API + "/api/users/login"


//Post Login for authentication
export async function POST(request) {  
  const requestData = await request.json();

  const jsonData = JSON.stringify(requestData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData
  };
  const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
  const responseData = await response.json();
  if (response.ok) {
    const authToken = responseData.token;
    setToken(authToken)
    return NextResponse.json({"Log in": true}, { status: 200 });
  }
  return NextResponse.json({"Log In": false}, {status: 400})
}
