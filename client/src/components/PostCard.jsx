import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <div className="relative">
      {/* Sacred halo / aura */}
      <div
        className="
          absolute -inset-1
          rounded-2xl
          bg-yellow-300/10 dark:bg-yellow-400/5
          blur-xl
          pointer-events-none
        "
      />

      {/* Card */}
      <div
        className="
          relative
          bg-white dark:bg-gray-950
          border border-gray-200 dark:border-gray-800
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={post.profileImage}
              alt={post.username}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-300 dark:ring-gray-700"
            />
            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
              {post.username}
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="bg-black">
          <img
            src={post.image}
            alt="Post"
            className="w-full max-h-[420px] object-cover"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Heart className="cursor-pointer hover:scale-110 transition text-gray-700 dark:text-gray-300" />
            <MessageCircle className="cursor-pointer hover:scale-110 transition text-gray-700 dark:text-gray-300" />
            <Send className="cursor-pointer hover:scale-110 transition text-gray-700 dark:text-gray-300" />
          </div>
          <Bookmark className="cursor-pointer hover:scale-110 transition text-gray-700 dark:text-gray-300" />
        </div>

        {/* Likes */}
        <div className="px-4 text-sm font-medium text-gray-900 dark:text-gray-100">
          {post.likes.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
          <span className="font-medium mr-1">{post.username}</span>
          {post.caption}
        </div>

        {/* Comments */}
        <div className="px-4 text-sm text-gray-500 dark:text-gray-400">
          View all {post.comments} comments
        </div>

        {/* Time */}
        <div className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">
          {new Date(post.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
