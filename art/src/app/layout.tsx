
"use client";
import localFont from "next/font/local";
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import { Shiba } from "./components/Shiba";
import { ArtClient } from "../services/artClient";

import { initialInProgressPost, initialPosts, InProgressPostType, PostType } from "@/services/artService";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

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


type GlobalContextType = { client: ArtClient, posts: PostType[]; inProgressPost: InProgressPostType, setInProgressPost: React.Dispatch<React.SetStateAction<InProgressPostType>> }

export const GlobalContext = createContext<GlobalContextType>({ client: new ArtClient(), posts: initialPosts, inProgressPost: initialInProgressPost, setInProgressPost: () => { } })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [inProgressPost, setInProgressPost] = useState<InProgressPostType>(initialInProgressPost);
  useEffect(() => {
    new ArtClient().getPosts().then((posts) => {
      console.log("allposts", posts);
      setPosts(posts);
    });
  }, []);
  return (
    <html lang="en">
      <ClerkProvider>
        <GlobalContext.Provider value={{ client: new ArtClient(), posts, inProgressPost, setInProgressPost }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </GlobalContext.Provider>
      </ClerkProvider>
    </html>
  );
}
