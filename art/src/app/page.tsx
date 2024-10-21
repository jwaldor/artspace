"use client";

import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "./layout";
import { PostType } from "./layout";


function CreatePost() {
  return <button className="flex rounded-md p-4 hover:bg-blue-100">Create</button>;
}

function Post({ post }: { post: PostType }) {

  return <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">{post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform} {JSON.stringify(post.parameters)}</div>;
}

export default function Home() {
  const { posts } = useContext(GlobalContext);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Art Space</h1>
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
