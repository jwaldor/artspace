"use client";
import { useState, useContext } from 'react';
import { GlobalContext, PostType, ArtForm } from '../layout';
import { useRouter } from 'next/navigation';
import { defaultArtForm } from '../layout';

export default function CreatePost() {

    const { inProgressPost, setInProgressPost } = useContext(GlobalContext);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would typically send this data to your backend
        // For now, we'll just log it and redirect
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">

        </div>
    );
}
