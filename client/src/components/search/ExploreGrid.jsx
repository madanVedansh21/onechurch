import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Heart, MessageCircle } from "lucide-react";
import { postsData } from "../../data/postsData.js";

export default function ExploreGrid({ onPostClick }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get("/posts?limit=20");
        setPosts(data?.posts?.length ? data.posts : []);
      } catch (error) {
        console.error("Failed to fetch explore posts", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /** 🔑 Unified source of truth */
  const displayPosts = posts.length > 0 ? posts : postsData;

  return (
    <div
      className="
        p-4
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        gap-4
        auto-rows-min
        grid-flow-row-dense
      "
    >
      {loading ? (
        [...Array(12)].map((_, i) => <SkeletonCard key={i} />)
      ) : displayPosts.length === 0 ? (
        <div className="col-span-full text-center py-10 text-gray-500">
          No exploration posts found.
        </div>
      ) : (
        displayPosts.map((post) => {
          /** ✅ SUPPORT BOTH DATA SHAPES */
          const imageUrl = post.media?.[0]?.url || post.image;

          if (!imageUrl) return null;

          const likes = post.likeCount ?? post.likes ?? 0;
          const comments = post.comments ?? 0;

          return (
            <div
              key={post._id || post.id}
              onClick={() => onPostClick?.(post)}
              className="
                relative cursor-pointer overflow-hidden
                rounded-xl bg-white dark:bg-gray-900
                shadow-sm
                transition-all duration-300 ease-out
                hover:shadow-xl hover:-translate-y-1
                active:scale-[0.98]
                group
                aspect-[4/5]
              "
            >
              <img
                src={imageUrl}
                alt=""
                className="
                  w-full h-full
                  object-cover
                  transition-transform duration-300
                  group-hover:scale-[1.05]
                "
              />

              {/* Hover Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-black/0 group-hover:bg-black/40
                  transition
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                "
              >
                <div className="flex items-center gap-6 text-white font-semibold">
                  <div className="flex items-center gap-2">
                    <Heart size={20} fill="white" />
                    <span>{likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} />
                    <span>{comments}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* ---------------- Skeleton ---------------- */

function SkeletonCard() {
  return (
    <div
      className="
        rounded-xl
        bg-gray-200 dark:bg-gray-800
        animate-pulse
        h-56 sm:h-60 md:h-64 lg:h-56
      "
    />
  );
}
