// src/components/forum/TweetCard.jsx
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

export default function TweetCard({ tweet }) {
  // Handle both backend 'postedBy' object and frontend static data formats
  const authorName = tweet.postedBy?.fullName || tweet.username || "Unknown";
  const authorHandle =
    tweet.postedBy?.email?.split("@")[0] ||
    tweet.handle ||
    authorName.replace(/\s+/g, "").toLowerCase();
  // const avatarUrl = tweet.postedBy?.profilePic || tweet.profileImage || "/logo2.jpg";
  const avatarUrl = "/logo2.jpg";
  const content = tweet.body || tweet.content || "";
  const likes = tweet.likeCount || tweet.likes || 0;

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition cursor-pointer">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={avatarUrl || "/logo2.jpg"}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-1.5 text-sm mb-1">
            <span className="font-bold text-gray-900 dark:text-gray-100 truncate">
              {authorName}
            </span>
            <span className="text-gray-500 truncate">@{authorHandle}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 hover:underline">
              {new Date(tweet.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Text Body */}
          <div className="text-gray-900 dark:text-gray-100 text-[15px] leading-normal whitespace-pre-wrap break-words">
            {content}
          </div>

          {/* Image Attachment (if any) */}
          {tweet.media && tweet.media.length > 0 && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Just showing first media for now */}
              <img
                src={tweet.media[0].url}
                alt=""
                className="w-full object-cover max-h-96"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center mt-3 max-w-sm text-gray-500">
            <button className="flex items-center gap-2 group hover:text-blue-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition">
                <MessageCircle size={18} />
              </div>
              <span className="text-xs">{tweet.comments || 0}</span>
            </button>

            <button className="flex items-center gap-2 group hover:text-green-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-green-500/10 transition">
                <Repeat size={18} />
              </div>
              <span className="text-xs">{tweet.retweets || 0}</span>
            </button>

            <button className="flex items-center gap-2 group hover:text-pink-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition">
                <Heart size={18} />
              </div>
              <span className="text-xs">{likes}</span>
            </button>

            <button className="flex items-center gap-2 group hover:text-blue-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition">
                <Share size={18} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
