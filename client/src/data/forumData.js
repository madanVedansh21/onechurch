// src/data/forumData.js

export const forumPosts = [
  {
    id: 1,
    username: "faithful_john",
    profileImage: "/profiles/john.png",
    content: "Remember to pray every day 🙏 #Faith #Prayer",
    hashtags: ["#Faith", "#Prayer"],
    likes: 120,
    comments: 15,
    retweets: 8,
    createdAt: new Date("2026-01-07T09:30:00"),
  },
  {
    id: 2,
    username: "grace_church",
    profileImage: "/profiles/church1.png",
    content: "Join us this Sunday for worship! #Worship #Community",
    hashtags: ["#Worship", "#Community"],
    likes: 98,
    comments: 10,
    retweets: 5,
    createdAt: new Date("2026-01-06T18:45:00"),
  },
  {
    id: 3,
    username: "youth_ministry",
    profileImage: "/profiles/youth.png",
    content: "Bible study session tomorrow at 7 PM! #BibleStudy #Youth",
    hashtags: ["#BibleStudy", "#Youth"],
    likes: 75,
    comments: 8,
    retweets: 3,
    createdAt: new Date("2026-01-06T12:00:00"),
  },
  {
    id: 4,
    username: "praise_band",
    profileImage: "/profiles/band.png",
    content: "New worship song released! 🎵 #Music #Praise",
    hashtags: ["#Music", "#Praise"],
    likes: 150,
    comments: 25,
    retweets: 12,
    createdAt: new Date("2026-01-05T15:20:00"),
  },
  {
    id: 5,
    username: "believers_ark_admin",
    profileImage: "/profiles/admin.png",
    content:
      "Welcome to Believer's Ark Forum! Share your thoughts and prayers here. #Community",
    hashtags: ["#Community"],
    likes: 200,
    comments: 30,
    retweets: 20,
    createdAt: new Date("2026-01-05T08:00:00"),
  },
];

// Optionally, trending hashtags
export const trendingHashtags = [
  "#Faith",
  "#Prayer",
  "#Worship",
  "#Community",
  "#BibleStudy",
  "#Youth",
  "#Praise",
  "#Music",
];
