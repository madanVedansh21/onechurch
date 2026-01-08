import { X } from "lucide-react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { storiesData } from "../data/storiesData";
import { isStoryExpired } from "../utils/storyUtils";

const STORY_DURATION = 5000;

export default function StoriesPage() {
  const { churchId } = useParams();
  const navigate = useNavigate();

  const church = storiesData.find((c) => String(c.churchId) === churchId);

  const stories = church.stories.filter((s) => !isStoryExpired(s.postedTime));

  const [index, setIndex] = useState(0);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  const startStory = () => {
    if (!progressRef.current) return;

    progressRef.current.style.transition = "none";
    progressRef.current.style.width = "0%";

    requestAnimationFrame(() => {
      progressRef.current.style.transition = `width ${STORY_DURATION}ms linear`;
      progressRef.current.style.width = "100%";
    });

    timerRef.current = setTimeout(() => {
      setIndex((i) => i + 1);
    }, STORY_DURATION);
  };

  useEffect(() => {
    if (index >= stories.length) {
      navigate(-1);
      return;
    }

    clearTimeout(timerRef.current);
    startStory();

    return () => clearTimeout(timerRef.current);
  }, [index]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <X size={28} />
      </button>

      <div className="relative w-full max-w-md h-full flex flex-col justify-center">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-10">
          {/* Progress */}
          <div className="flex gap-1 mb-3">
            {stories.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[3px] bg-white/30 rounded overflow-hidden"
              >
                {i === index && (
                  <div ref={progressRef} className="h-full bg-white w-0" />
                )}
                {i < index && <div className="h-full bg-white w-full" />}
              </div>
            ))}
          </div>

          {/* Church Info */}
          <div className="flex items-center gap-3">
            <img
              src={church.profileThumb}
              className="w-9 h-9 rounded-full object-cover border border-white/40"
            />
            <span className="text-white text-sm font-medium">
              {church.churchName}
            </span>
          </div>
        </div>

        {/* Story Image */}
        <div className="relative w-full h-full flex items-center justify-center group">
          <img
            src={stories[index]?.image}
            className="max-h-full max-w-full object-contain"
          />

          {/* Left Arrow */}
          {index > 0 && (
            <button
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 
                 text-white/70 hover:text-white
                 opacity-0 group-hover:opacity-100
                 transition"
            >
              <BsArrowLeftCircleFill size={24} />
            </button>
          )}

          {/* Right Arrow */}
          {index < stories.length - 1 && (
            <button
              onClick={() => setIndex((i) => i + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 
                 text-white/70 hover:text-white
                 opacity-0 group-hover:opacity-100
                 transition"
            >
              <BsArrowRightCircleFill size={24} />
            </button>
          )}

          {/* Tap zones (mobile-friendly) */}
          <div
            className="absolute left-0 top-0 w-1/2 h-full"
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full"
            onClick={() => setIndex((i) => i + 1)}
          />
        </div>
      </div>
    </div>
  );
}
