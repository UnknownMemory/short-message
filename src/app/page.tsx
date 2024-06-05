import { Post } from "@/components/Post";


export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">
      <div id="feed" className="min-h-full w-[35%]">
        {/* <div className="text-center p-2">Following</div> */}
        <div className="flex flex-col">
          <Post></Post>
        </div>
      </div>
    </main>
  );
}
