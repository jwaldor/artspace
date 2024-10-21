import { createContext, useState } from "react";

export const GlobalContext = createContext({});

type Post = {
    id: string;
    name: string;
    likes: number;
    updatedAt: Date;
    creator: string;
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    return <GlobalContext.Provider value={{ posts }}>{children}</GlobalContext.Provider>;
};
