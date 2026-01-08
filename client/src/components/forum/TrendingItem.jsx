{
  /* Trending Hashtags */
}
<div className="mt-6">
  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
    Trending
  </h3>
  <ul className="flex flex-col gap-2">
    {trendingHashtags.map((tag, i) => (
      <li
        key={i}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-blue-500 transition"
      >
        <Hash size={16} />
        {tag}
      </li>
    ))}
  </ul>
</div>;
