
"use client";
import localFont from "next/font/local";
import "./globals.css";
import { createContext, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export const GlobalContext = createContext({});


export type PostType = {
  id: string;
  name: string;
  likes: number;
  updatedAt: Date;
  creator: string;
  artform: string;
  parameters: object;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, setPosts] = useState<PostType[]>([{ id: "1", name: "Post 1", likes: 0, updatedAt: new Date(), creator: "User 1", artform: "Painting", parameters: { width: 100, height: 100 } }]);
  return (
    <html lang="en">
      <GlobalContext.Provider value={{ posts }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </GlobalContext.Provider>
    </html>
  );
}
