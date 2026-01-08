import ThemeToggle from "../ThemeToggle";
import { Bell, Settings } from "lucide-react";
import StoriesRow from "./StoriesRow";
import { postsData } from "../../data/postsData";
import PostCard from "../PostCard";

export default function MiddleFeed() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar (fixed) */}
      <div
        className="
          sticky top-0 z-20
          flex justify-between items-center
          px-6 py-4
          border-b border-gray-200 dark:border-gray-800
          bg-white/80 dark:bg-gray-950/80
          backdrop-blur
        "
      >
        <div className="text-xl font-semibold tracking-wide">
          Believer&apos;s Ark
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <Bell size={20} />
          </button>

          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Stories (fixed) */}
      <div
        className="
          sticky top-[72px] z-10
          border-b border-gray-200 dark:border-gray-800
          bg-white/90 dark:bg-gray-950/90
          backdrop-blur
          px-4 py-3
        "
      >
        <StoriesRow />
      </div>

      {/* Feed Background (subtle sacred texture) */}
      <div className="relative flex-1 overflow-y-auto">
        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-yellow-50/40 via-transparent to-transparent
            dark:from-yellow-400/5
            pointer-events-none
          "
        />

        {/* Posts (ONLY SCROLL AREA) */}
        <div className="relative px-4 py-8 flex justify-center">
          <div className="w-full max-w-xl flex flex-col gap-10">
            {postsData.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
