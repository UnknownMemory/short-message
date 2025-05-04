import { Metadata } from "next";


export async function generateMetadata({params}: {params: Promise<{username: string}>}): Promise<Metadata> {
    const { username } = await params
    return {
        title: `@${username} / Short Message`,
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

