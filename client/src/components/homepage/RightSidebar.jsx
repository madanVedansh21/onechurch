import { useEffect, useState } from "react";
import { devotionalsData } from "../../data/devotionalsData";

export default function RightSidebar() {
  const trending = [
    { hashtag: "#Faith", count: 120 },
    { hashtag: "#Prayer", count: 95 },
    { hashtag: "#ChurchLife", count: 80 },
    { hashtag: "#BibleVerse", count: 75 },
    { hashtag: "#Community", count: 60 },
  ];

  const [devotional, setDevotional] = useState(null);
  const [amenClicked, setAmenClicked] = useState(false);

  // Pick random devotional ONCE
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * devotionalsData.length);
    setDevotional(devotionalsData[randomIndex]);
  }, []);

  const handleAmen = () => {
    setAmenClicked(true);

    setTimeout(() => {
      setAmenClicked(false);
    }, 2000);
  };

  if (!devotional) return null;

  return (
    <div className="p-4 flex flex-col gap-6">
      {/* Trending */}
      <div>
        <h2 className="font-semibold mb-2">#Trending</h2>
        <ul className="flex flex-col gap-2">
          {trending.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between text-gray-700 dark:text-gray-300 text-sm"
            >
              <span>{item.hashtag}</span>
              <span>{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Devotional */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-3">
        <h2 className="font-semibold">Devotional</h2>

        <p className="italic text-sm">"{devotional.verse}"</p>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {devotional.prayer}
        </p>

        <button
          onClick={handleAmen}
          className="mt-2 py-2 rounded-full text-sm font-medium transition
                     bg-black text-white dark:bg-white dark:text-black
                     hover:opacity-90"
        >
          {amenClicked ? "Recorded in logs" : "Amen"}
        </button>
      </div>
    </div>
  );
}
