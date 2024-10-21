import React from 'react';

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="create-layout">
            {/* You can add any layout-specific elements here */}
            {children}
        </div>
    );
}
