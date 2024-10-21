import { Shiba } from "./Shiba";

import { ArtForm, PostType } from "@/services/artService";

export function getArtFormComponent(artForm: ArtForm) {
    if (artForm.type === "Shiba") {
        return <Shiba fog={artForm.parameters.fog} />;
    }
    return null;
}

function Post({ post }: { post: PostType }) {



    return <>
        <div className="flex border border-gray-300 rounded-md p-4 w-[75%]">{post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform.type} {JSON.stringify(post.artform.parameters)}</div>
        {getArtFormComponent(post.artform)}
    </>;
}

export default Post;