// src/components/forum/ForumFeed.jsx
import TweetCard from "./TweetCard";
import { forumPosts } from "../../data/forumData";

export default function ForumFeed({ tweets }) {
  // Fallback to demo data ONLY if tweets is empty or undefined
  const displayTweets = tweets && tweets.length > 0 ? tweets : forumPosts;

  if (!displayTweets.length) {
    return (
      <div className="p-8 text-center text-gray-500">
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {displayTweets.map((tweet) => (
        <TweetCard key={tweet.id || tweet._id} tweet={tweet} />
      ))}
    </div>
  );
}
