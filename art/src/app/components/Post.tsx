import { Shiba } from "./artforms/Shiba";

import { ArtForm, PostType } from "@/services/artService";

export function getArtFormComponent(artForm: ArtForm) {
    console.log("artForm", artForm);
    if (artForm.type === "Shiba") {
        return <Shiba fog={artForm.parameters.fog} />;
    }
    return null;
}

function Post({ post }: { post: PostType }) {
    console.log("post", post);
    return (
        <div className="w-[75%]">
            <div className="flex border border-gray-300 rounded-md p-4">
                {post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform.type} {JSON.stringify(post.artform.parameters)}
            </div>
            <div style={{ height: '400px' }}> {/* Add fixed height */}
                {getArtFormComponent(post.artform)}
            </div>
        </div>
    );
}
export default Post;