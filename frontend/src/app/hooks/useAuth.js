const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;

export function getToken() {
  const myAuthToken = cookies().get("auth-token");
  return myAuthToken?.value;
}

export function setToken(authToken) {
  const myAuthToken = cookies().get("auth-token");
  return cookies().set({
    name: "auth-token",
    value: authToken,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: TOKEN_AGE,
  });
}

export function deleteToken() {
  return cookies().delete("auth-token");
}
