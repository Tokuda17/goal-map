"use server";

import { getToken, setRefreshToken, setToken } from "@/app/hooks/useAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/users/login";

export async function POST(request) {
  const myAuthToken = getToken()
  console.log(myAuthToken)
  
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
    console.log(authToken)
    setToken(authToken)
    return NextResponse.json({"Log in": true}, { status: 200 });

  }
  return NextResponse.json({"Log In": false}, {status: 400})
}
