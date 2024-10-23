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
            <div className="flex border border-gray-300 rounded-md p-4 items-center justify-center">
                {/* {post.name} {post.likes} {post.updatedAt.toLocaleDateString()} {post.artform.type} {JSON.stringify(post.artform.parameters)} */}
                <div style={{ height: '48rem', width: '48rem' }}> {/* Add fixed height */}
                    {getArtFormComponent(post.artform)}
                </div>

            </div>
            <div className="flex justify-between items-center">
                <div>{post.name} {post.updatedAt.toLocaleDateString()}</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="none" stroke="black" style={{ transform: 'translateY(-2px)' }}>
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg> {post.likes}
                </div>
            </div>

        </div>
    );
}
export default Post;