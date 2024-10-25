"use client";

import { useContext } from "react";
import { GlobalContext } from "./layout";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Post from "./components/Post";
import { useRouter } from "next/navigation";
import { ThreeBody } from "./components/artforms/ThreeBody";





function CreatePost() {
  const router = useRouter();
  return <button className="flex rounded-md p-4 hover:bg-blue-100 self-start ml-2" onClick={() => {
    router.push("/create");
  }}>Create</button>;
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
        {/* <CreatePost /> */}
        {/* <ThreeBody /> */}
        <div className="flex flex-col items-center gap-4">
          <CreatePost />
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {/* <ThreeBody /> */}
        </div>
      </div>
    </main>
  );
}
