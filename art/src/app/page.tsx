"use client";

import { useContext, useEffect } from "react";
import { GlobalContext } from "./layout";
import { PostType } from "./layout";
import { Shiba } from "./components/Shiba";
import { getArtFormComponent } from "./components/Post";
import { ArtClient } from "../services/artClient";


function Post({ post_index }: { post_index: number }) {
  const { posts } = useContext(GlobalContext);
  const post = posts[post_index];

  return <>
    <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">{post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform.type} {JSON.stringify(post.artform.parameters)}</div>
    {getArtFormComponent(post.artform)}

  </>;
}

function CreatePost() {
  return <button className="flex rounded-md p-4 hover:bg-blue-100">Create</button>;
}


function PostCreator() {
  return (<>
    <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">

      Post Creation</div>
  </>
  );

}

export default function Home() {
  const { posts } = useContext(GlobalContext);
  useEffect(() => {
    const artClient = new ArtClient();
    artClient.createPost({ name: "test", artform: { type: "Shiba", parameters: { fog: 0 } } }).then((post) => {
      console.log("created post");
      console.log(post);
    });
  }, []);
  return (
    <main>
      <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Art Space</h1>
        {/* <PostCreator /> */}
        <CreatePost />

        {posts.map((post, index) => (
          <Post key={post.id} post_index={index} />
        ))}
      </div>
    </main>
  );
}
