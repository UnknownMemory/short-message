import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";


export default function Home() {
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
