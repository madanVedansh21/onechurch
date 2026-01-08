import { X } from "lucide-react";
import PostCard from "../PostCard"; // adjust path if needed

export default function ExplorePostModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="relative max-w-lg w-full mx-4">
        {/* Close */}
        <button
          onClick={onClose}
          className="
            fixed top-2 right-2
            text-white/80 hover:text-white
            transition
          "
        >
          <X size={28} />
        </button>

        {/* Post */}
        <div className="rounded-xl overflow-hidden">
          <PostCard post={post} />
        </div>
      </div>
    </div>
  );
}
