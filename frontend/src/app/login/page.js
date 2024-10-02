// frontend/src/app/login/page.js
"use client"; // This directive is correct for client-side rendering in Next.js

//import { cookies } from "next/headers";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const LOGIN_URL = "/api/login/";

export default function LoginPage() {
  // Handle login form submission

  const router = useRouter();
  async function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(LOGIN_URL, requestOptions);

    if (response.ok) {
      const rData = await response.json();
      console.log(rData);
      router.replace("/");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
