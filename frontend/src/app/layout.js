// src/app/layout.js
"use client"; // Only if you use hooks

import "./styles/globals.css"; // Import your global styles
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
