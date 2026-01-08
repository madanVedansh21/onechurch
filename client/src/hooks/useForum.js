// src/hooks/useForum.js
import { useForumContext } from "../context/ForumContext";

export default function useForum() {
  const { tweets, postTweet, likeTweet } = useForumContext();

  return {
    tweets,
    postTweet,
    upvoteTweet: likeTweet, // Mapping upvote to like
    downvoteTweet: () => {}, // Not implemented in backend yet
  };
}
