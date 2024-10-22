"use client";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../layout';
import { useRouter } from 'next/navigation';
import { useControls } from 'leva';
import { updateParameters } from '@/services/artService';


import { getArtFormComponent } from '../components/Post';

export default function CreatePost() {

    const { inProgressPost, setInProgressPost } = useContext(GlobalContext);
    const params = useControls('Art Form Parameters', inProgressPost.artform.parameters);
    const router = useRouter();


    console.log("parameters", inProgressPost.artform.parameters);

    // const t = useControls({ inProgressPost.artform.parameters });


    // Update inProgressPost when params change
    useEffect(() => {
        setInProgressPost(prev => updateParameters(prev, params));
    }, [params, setInProgressPost]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically send this data to your backend
        // For now, we'll just log it and redirect
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            {getArtFormComponent(inProgressPost.artform)}
            <button className="flex rounded-md p-4 hover:bg-blue-100">Create</button>
        </div>
    );
}
