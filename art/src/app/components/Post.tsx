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
            <div className="flex flex-col border border-gray-300 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-lg">{post.name}</div>
                    <div className="text-sm text-gray-500">{post.updatedAt.toLocaleDateString()}</div>
                </div>
                <div className="flex items-center justify-center">
                    <div style={{ height: '48rem', width: '48rem' }}>
                        {getArtFormComponent(post.artform)}
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center mt-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="none" stroke="black" style={{ transform: 'translateY(-2px) translateX(1px)' }}>
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg> <span className="mr-[1px]">{post.likes} </span>
                </div>
            </div>
        </div>
    );
}
export default Post;