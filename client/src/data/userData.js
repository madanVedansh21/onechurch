export const userData = {
  id: "user_001",
  username: "st_peters_church",
  displayName: "St. Peter’s Church",
  role: "church", // user | church | admin
  bio: "A community rooted in faith, love, and service. ✝️",
  profileImage: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
  coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

  stats: {
    posts: 12,
    followers: 1840,
    following: 210,
  },

  followersList: [
    { id: "u1", username: "grace_walker" },
    { id: "u2", username: "faith.daily" },
    { id: "u3", username: "john_ark" },
  ],

  followingList: [
    { id: "c1", username: "hope_church" },
    { id: "c2", username: "city_of_light" },
  ],

  postIds: [
    1,
    3,
    4,
    7,
    9,
    10, // map these from postsData
  ],
};
