
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


type GlobalContextType = { posts: PostType[] }

const initialApplicationState: GlobalContextType = { posts: [] }

export const GlobalContext = createContext<GlobalContextType>(initialApplicationState)

export type ShibaParameters = { fog: number }
export type ArtForm = { type: "Shiba"; parameters: ShibaParameters }

export type PostType = {
  id: string;
  name: string;
  likes: number;
  updatedAt: Date;
  creator: string;
  artform: ArtForm;
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, setPosts] = useState<PostType[]>([{ id: "1", name: "Post 1", likes: 0, updatedAt: new Date(), creator: "User 1", artform: { type: "Shiba", parameters: { fog: 1 } }, }]);
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
