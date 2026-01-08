import { useNavigate } from "react-router-dom";
import { storiesData } from "../../data/storiesData";
import { isStoryExpired } from "../../utils/storyUtils";
import StoryThumbnail from "./StoryThumbnail";

export default function StoriesRow() {
  const navigate = useNavigate();

  const validStories = storiesData.filter((church) =>
    church.stories.some((s) => !isStoryExpired(s.postedTime))
  );

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
        {validStories.map((church) => (
          <StoryThumbnail
            key={church.churchId}
            church={church}
            onClick={() => navigate(`/stories/${church.churchId}`)}
          />
        ))}
      </div>
    </div>
  );
}
