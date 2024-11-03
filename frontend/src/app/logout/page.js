// frontend/src/app/login/page.js
"use client"; // This directive is correct for client-side rendering in Next.js

//import { cookies } from "next/headers";

import { useRouter } from "next/navigation";

const LOGOUT_URL = "/api/logout/";

export default function LoginPage() {
  const router = useRouter();
  async function handleClick(event) {
    console.log(event);
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    const response = await fetch(LOGOUT_URL, requestOptions);

    if (response.ok) {
      const rData = await response.json();
      router.replace("/");
      console.log("logged out");
    }
  }

  return (
    <div>
      <h1>Logout</h1>
      <h2>Are you sure you want to logout</h2>
      <button onClick={handleClick}>Yes, Logout</button>
    </div>
  );
}
