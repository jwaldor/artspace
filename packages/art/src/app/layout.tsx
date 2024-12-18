
"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useEffect, useState } from "react";
import { ArtClient } from "../services/artClient";
import { zapiClient } from "../services/artClient";
import { ArtContext } from "../services/artService";

import { initialInProgressPost, initialPosts, InProgressPostType, PostType } from "@/services/artService";
import {
  ClerkProvider,
  SignInButton,
  SignedOut,
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




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [inProgressPost, setInProgressPost] = useState<InProgressPostType>(initialInProgressPost);
  useEffect(() => {
    zapiClient.get("/allPosts").then((posts) => {
      console.log("allposts", posts);
      const sortedPosts = posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      setPosts(sortedPosts);
    });
  }, []);
  return (
    <html lang="en">
      <ClerkProvider>
        <ArtContext.Provider value={{ client: new ArtClient(), posts, inProgressPost, setInProgressPost, setPosts }}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </ArtContext.Provider>
      </ClerkProvider>
    </html>
  );
}
