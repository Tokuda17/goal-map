"use server";

import { getToken, setRefreshToken, setToken } from "../../hooks/useAuth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_EVENT_URL = process.env.NEXT_PUBLIC_API + "/api/events/"



export async function GET(request) {
  const token = getToken();
  // Get the token using your getToken function

  // Send API request GET to get Users
  const response = await fetch(DJANGO_API_EVENT_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Include the token for authentication
    },
  });

  if (!response.ok) {
    console.log("Failed")
    return NextResponse.json({ "Events": false }, { status: 400 });

  } else {

    const data = await response.json();
    const events = data.results;
    console.log(events.length); // Correct the logging to access the fetched data
    return NextResponse.json({"events": events}, { status: 200 });

  }
  
}

//POST event API call
export async function POST(request){
  //Get User Auth Token
  const token = getToken();

  //Process request data
  const requestData = await request.json()
  const jsonData = JSON.stringify(requestData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: jsonData
  };

  //Await Post response 
  const response = await fetch(DJANGO_API_EVENT_URL, requestOptions);
  const responseData = await response.json();


  if (response.ok) {
    //Event Succesfully Posted
    console.log(responseData);
    console.log("POST EVENT")
    return NextResponse.json({"Event Created": true}, { status: 200 });

  }
  //Return Error otherwise
  return NextResponse.json({"Event Created": false}, {status: 400})
}

export async function DELETE(request){
  const token = getToken()
  const requestData = await request.json()

  const response = await fetch(requestData.url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (response.ok) {
    console.log("DELETE")
    return NextResponse.json({"Event Deleted": true}, { status: 200 });
  }

  return NextResponse.json({"Event Deleted": false}, {status: 400})
  
}