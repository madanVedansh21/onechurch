export default function ForumRightSidebar() {
  const trending = [
    "#Faith",
    "#Prayer",
    "#BibleVerse",
    "#ChurchLife",
    "#Praise",
    "#ChristianMusic",
  ];

  const topics = [
    "Devotionals",
    "Testimonies",
    "Sermons",
    "Bible Study",
    "Community",
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Trending */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Thinking about these?
        </h2>
        <ul className="flex flex-col gap-3">
          {trending.map((tag) => (
            <li
              key={tag}
              className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded transition"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {tag}
              </span>
              <div className="text-xs text-gray-500">2.5k posts</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Topics */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          Topics
        </h2>
        <ul className="flex flex-col gap-2">
          {topics.map((topic) => (
            <li
              key={topic}
              className="px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition font-medium"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
