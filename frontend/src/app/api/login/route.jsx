"use server";

import { getToken, setRefreshToken, setToken } from "../../hooks/useAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL_LOCAL = "http://127.0.0.1:8000/api/users/login";
const DJANGO_API_LOGIN_URL = "http://3.19.134.198:8000/api/users/login";


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
  const response = await fetch(DJANGO_API_LOGIN_URL_LOCAL, requestOptions);
  const responseData = await response.json();
  if (response.ok) {
    const authToken = responseData.token;
    setToken(authToken)
    return NextResponse.json({"Log in": true}, { status: 200 });
  }
  return NextResponse.json({"Log In": false}, {status: 400})
}
