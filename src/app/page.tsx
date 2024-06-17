"use client"


import { useQuery } from "@tanstack/react-query";

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";


const getCurrentUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/me`, {method: 'GET', headers: {'Authorization': `Bearer ${document.cookie.match('(^|;)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)')?.pop()}`, 'Content-Type': 'application/json'}});
    
    if(res.status === 401){
        const authError = new Error('Authentication error')
        authError.status = 401
        throw authError
    }
    
    return await res.json();
};


export default function Home() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['me'],
    queryFn: () => getCurrentUser()
  })
  return (
    <main className="min-h-screen flex justify-center">
      <div id="feed" className="min-h-full md:w-[35%] w-[90%]">
        <PostInput />
        <div className="flex flex-col">
          <Post />
        </div>
      </div>
    </main>
  );
}
