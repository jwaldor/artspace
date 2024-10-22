"use client";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../layout';
import { useRouter } from 'next/navigation';
import { useControls } from 'leva';
import { updateParameters } from '@/services/artService';


import { getArtFormComponent } from '../components/Post';
import { useAuth } from '@clerk/nextjs';

export default function CreatePost() {

    const { client, inProgressPost, setInProgressPost } = useContext(GlobalContext);
    const { getToken } = useAuth();
    const params = useControls('Art Form Parameters', inProgressPost.artform.parameters);
    const router = useRouter();


    console.log("parameters", inProgressPost.artform.parameters);

    // const t = useControls({ inProgressPost.artform.parameters });


    // Update inProgressPost when params change
    useEffect(() => {
        setInProgressPost(prev => updateParameters(prev, params));
    }, [params, setInProgressPost]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await getToken();
        console.log("firsttoken", token);
        console.log("calling createPost");
        client.createPost(inProgressPost, token ?? undefined).then((post) => {
            console.log("created post");
            console.log(post);
        });
        // Here you would typically send this data to your backend
        // For now, we'll just log it and redirect
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            {getArtFormComponent(inProgressPost.artform)}
            <button className="flex rounded-md p-4 hover:bg-blue-100" onClick={handleSubmit}>Create</button>
        </div>
    );
}
