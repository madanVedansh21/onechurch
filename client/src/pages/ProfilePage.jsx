import { useState, useEffect } from "react";
import LeftSidebar from "../components/LeftSidebar";
import PostCard from "../components/PostCard";
import TweetCard from "../components/forum/TweetCard";
import { ImagePlus, Settings, Grid, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("posts"); // 'posts' | 'tweets'
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id || user?.id) {
      const fetchPosts = async () => {
        try {
          const userId = user._id || user.id;
          const { data } = await api.get(`/posts?userId=${userId}`);
          setPosts(data.posts || []);
        } catch (error) {
          console.error("Failed to fetch user posts", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [user]);

  // Derived state for tabs
  const mediaPosts = posts.filter((p) => p.media && p.media.length > 0);
  const textPosts = posts.filter((p) => !p.media || p.media.length === 0);

  const displayPosts = activeTab === "posts" ? mediaPosts : textPosts;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black dark:text-gray-100">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-gray-900 dark:text-gray-100 w-full">
      {/* Left Sidebar */}
      <div className="w-36 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0">
        <LeftSidebar />
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto w-full">
        {/* Cover + Profile Header */}
        <div className="relative">
          <div className="w-full h-60 bg-gradient-to-r from-blue-400 to-purple-500">
            {/* Placeholder Cover - could be user.coverImage if backend supports it */}
          </div>

          <div className="px-8 relative">
            <div className="absolute -top-16 left-8">
              <img
                src={user.profilePic || "/logo2.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-black object-cover bg-white"
              />
            </div>

            {/* Edit Profile Button (Right Aligned) */}
            <div className="flex justify-end pt-4">
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm">
                Edit Profile
              </button>
            </div>

            {/* User Info */}
            <div className="mt-4 mb-6">
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              <p className="text-gray-500">@{user.email?.split("@")[0]}</p>

              <p className="mt-4 max-w-xl text-sm text-gray-700 dark:text-gray-300">
                {user.bio || "No bio yet."}
              </p>

              {/* Stats Row */}
              <div className="flex gap-6 mt-4 text-sm text-gray-500">
                <span>
                  <strong className="text-gray-900 dark:text-gray-100">
                    {posts.length}
                  </strong>{" "}
                  Posts
                </span>
                <span>
                  <strong className="text-gray-900 dark:text-gray-100">
                    {user.followerCount || 0}
                  </strong>{" "}
                  Followers
                </span>
                <span>
                  <strong className="text-gray-900 dark:text-gray-100">
                    {user.followingCount || 0}
                  </strong>{" "}
                  Following
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Area (Simplified) */}
        <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-3">
            <img
              src={user.profilePic || "/logo2.jpg"}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <input
              placeholder="What's on your mind?"
              className="flex-1 bg-transparent outline-none pt-2"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-10">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-4 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition flex justify-center items-center gap-2 ${
              activeTab === "posts"
                ? "border-b-4 border-blue-500 text-gray-900 dark:text-white"
                : "text-gray-500"
            }`}
          >
            <Grid size={18} /> Posts
          </button>
          <button
            onClick={() => setActiveTab("tweets")}
            className={`flex-1 py-4 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition flex justify-center items-center gap-2 ${
              activeTab === "tweets"
                ? "border-b-4 border-blue-500 text-gray-900 dark:text-white"
                : "text-gray-500"
            }`}
          >
            <MessageSquare size={18} /> Tweets
          </button>
        </div>

        {/* Content Feed */}
        <div className="min-h-[300px]">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading posts...
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center text-gray-500">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                {activeTab === "posts" ? (
                  <Grid size={24} />
                ) : (
                  <MessageSquare size={24} />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                No {activeTab} yet
              </h3>
              <p className="text-sm">
                When you create {activeTab}, they will appear here.
              </p>
            </div>
          ) : (
            <div
              className={
                activeTab === "posts"
                  ? "grid grid-cols-3 gap-1"
                  : "flex flex-col"
              }
            >
              {activeTab === "posts"
                ? // Grid View for Media Posts
                  displayPosts.map((post) => (
                    <div
                      key={post._id}
                      className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer hover:opacity-90 transition"
                    >
                      {post.media && post.media[0] ? (
                        <img
                          src={post.media[0].url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  ))
                : // List View for Text Tweets
                  displayPosts.map((post) => (
                    <TweetCard key={post._id} tweet={post} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
