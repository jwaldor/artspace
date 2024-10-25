"use client";
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../layout';
import { useRouter } from 'next/navigation';
import { LevaPanel, useControls } from 'leva';
import { ArtForm, artFormDefaults, InProgressPostType, updateParameters } from '@/services/artService';


import { getArtFormComponent } from '../components/Post';
import { useAuth } from '@clerk/nextjs';

export default function CreatePost() {

    const { client, inProgressPost, setInProgressPost } = useContext(GlobalContext);
    const [artType, setArtType] = useState<InProgressPostType["artform"]["type"]>(inProgressPost.artform.type);
    const { getToken } = useAuth();
    const params = useControls('Art Form Parameters', { test: { value: 1, min: 0, max: 10 } });
    const router = useRouter();


    console.log("parameters", inProgressPost.artform.parameters);

    // const t = useControls({ inProgressPost.artform.parameters });


    // Update inProgressPost when params change
    // useEffect(() => {
    //     setInProgressPost(prev => updateParameters(prev, params));
    // }, [params, setInProgressPost]);



    function getArtFormEditor() {
        if (inProgressPost.artform.type === "Conway" && "live" in inProgressPost.artform.parameters) {
            console.log("live", inProgressPost.artform.parameters.live);
            return (
                <div className="grid gap-1 p-4">
                    {inProgressPost.artform.parameters.live.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-1">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-6 h-6 rounded-full cursor-pointer ${cell ? 'bg-green-500' : 'bg-gray-300'}`}
                                    onClick={() => {
                                        const newLive = inProgressPost.artform.parameters.live.map((r, i) =>
                                            i === rowIndex
                                                ? r.map((c, j) => (j === colIndex ? !c : c))
                                                : [...r]
                                        );
                                        setInProgressPost(prev => {
                                            return {
                                                artform: {
                                                    ...prev.artform,
                                                    parameters: {
                                                        live: newLive
                                                    }
                                                }
                                            }
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )
        }
    }

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
            <select
                className="mt-4 block w-full rounded-md border border-gray-300 p-2"
                value={artType}
                onChange={(e) => {
                    const newType = e.target.value as InProgressPostType["artform"]["type"];
                    setArtType(newType);
                    setInProgressPost(artFormDefaults[newType]);
                }}
            >
                <option value="Shiba">Shiba</option>
                <option value="Conway">Conway</option>
            </select>
            {getArtFormEditor()}
        </div>

    );
}
