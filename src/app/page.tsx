import { Post } from "@/components/Post";


export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">
      <div id="feed" className="min-h-full w-[40%] border-x">
        <div className="text-center p-2 border-b">Following</div>
        <div className="flex">
          <Post></Post>
        </div>
      </div>
    </main>
  );
}
