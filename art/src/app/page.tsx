"use client";

import { useContext } from "react";
import { GlobalContext } from "./layout";
import { PostType } from "./layout";
import { Shiba } from "./components/Shiba";


function Post({ post_index }: { post_index: number }) {
  const { posts } = useContext(GlobalContext);
  const post = posts[post_index];

  return <>
    <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">{post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform.type} {JSON.stringify(post.artform.parameters)}</div>
    <Shiba fog={post.artform.parameters.fog} />

  </>;
}

function CreatePost() {
  return <button className="flex rounded-md p-4 hover:bg-blue-100">Create</button>;
}


function PostCreator() {
  return (<>
    <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">

      Post Creation</div>
    <CreatePost />
  </>
  );

}

export default function Home() {
  const { posts } = useContext(GlobalContext);
  return (
    <main>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Art Space</h1>
        <PostCreator />
        {posts.map((post, index) => (
          <Post key={post.id} post_index={index} />
        ))}
      </div>
    </main>
  );
}
