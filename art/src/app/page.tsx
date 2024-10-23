"use client";

import { useContext } from "react";
import { GlobalContext } from "./layout";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Post from "./components/Post";




function CreatePost() {
  return <button className="flex rounded-md p-4 hover:bg-blue-100">Create</button>;
}




export default function Home() {
  const { posts } = useContext(GlobalContext);
  return (
    <main>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <SignedIn>
          signed in
        </SignedIn>
        <SignedOut>
          signed out
        </SignedOut>
        <h1>Art Space</h1>
        <CreatePost />

        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}

      </div>
    </main>
  );
}
