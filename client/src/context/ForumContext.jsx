import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const ForumContext = createContext();

export const ForumProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Refresh feed on user change?

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/posts");
      setTweets(data.posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTweets();
    }
  }, [user]);

  const postTweet = async (tweetData) => {
    try {
      // Map frontend tweetData to backend Post model
      const payload = {
        body: tweetData.content,
        title: "Forum Post",
        // TODO: Handle image upload via separate endpoint or FormData
        // keeping it simple for now
      };
      const { data } = await api.post("/posts", payload);

      // Add author info for immediate UI update (since backend populate might need refetch)
      const newPost = { ...data.post, postedBy: user };
      setTweets((prev) => [newPost, ...prev]);
      return newPost;
    } catch (error) {
      console.error("Post failed", error);
      throw error;
    }
  };

  const likeTweet = async (id) => {
    try {
      const { data } = await api.post(`/posts/${id}/like`);
      // Optimistic update already handled? data returns likeCount
      setTweets((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, likeCount: data.likeCount } : t
        )
      );
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  return (
    <ForumContext.Provider
      value={{ tweets, loading, postTweet, likeTweet, refresh: fetchTweets }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => useContext(ForumContext);
