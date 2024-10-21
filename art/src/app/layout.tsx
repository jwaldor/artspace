
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


type GlobalContextType = { posts: PostType[]; inProgressPost: InProgressPostType, setInProgressPost: React.Dispatch<React.SetStateAction<InProgressPostType>> }

const initialApplicationState: GlobalContextType = { posts: [], inProgressPost: { name: "", artform: { type: "Shiba", parameters: { fog: 20 } } }, setInProgressPost: () => { } }

export const GlobalContext = createContext<GlobalContextType>(initialApplicationState)

export type ShibaParameters = { fog: number }

export type ArtForms = "Shiba"
export const defaultArtForm: ArtForms = "Shiba"

export type ArtForm = { type: ArtForms; parameters: ShibaParameters }

export type PostType = {
  id: string;
  name: string;
  likes: number;
  updatedAt: Date;
  creator: string;
  artform: ArtForm;
};

export type InProgressPostType = {
  name: string;
  artform: ArtForm
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [posts, setPosts] = useState<PostType[]>([{ id: "1", name: "Post 1", likes: 0, updatedAt: new Date(), creator: "User 1", artform: { type: "Shiba", parameters: { fog: 1 } }, }]);
  const [inProgressPost, setInProgressPost] = useState<InProgressPostType>(initialApplicationState.inProgressPost);
  return (
    <html lang="en">
      <GlobalContext.Provider value={{ posts, inProgressPost, setInProgressPost }}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </GlobalContext.Provider>
    </html>
  );
}
