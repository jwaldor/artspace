"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const LevaPanel = dynamic(() => import('leva').then((mod) => mod.Leva), {
    ssr: false,
});

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="create-layout">
            {/* You can add any layout-specific elements here */}
            {children}
            <LevaPanel collapsed={false} />
        </div>
    );
}
