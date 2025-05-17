import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Settings / Short Message",
    description: "",
};
  
export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
