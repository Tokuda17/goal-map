// src/app/layout.js
"use client"; // Only if you use hooks

import "./styles/globals.css"; // Import your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
