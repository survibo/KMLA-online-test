import { ChevronRight, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { SectionCard } from "./section-card";

function FavoritePostRow({ post }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="min-w-[72px] font-semibold text-zinc-800">
        {post.board}
      </div>

      <div className="min-w-0 flex-1 truncate text-zinc-500">{post.title}</div>

      <div className="flex shrink-0 items-center gap-2 text-zinc-600">
        {post.likes !== null ? (
          <span className="flex items-center gap-1 text-emerald-500">
            <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
          </span>
        ) : null}

        {post.comments !== null ? (
          <span className="text-zinc-700">Q {post.comments}</span>
        ) : null}

        {post.isNew ? (
          <Badge className="h-5 rounded-md bg-violet-600 px-1.5 text-[10px]">
            N
          </Badge>
        ) : null}
      </div>
    </div>
  );
}

export function FavoritesSection({ favorites }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold tracking-tight">
          {favorites.title}
        </h2>

        <button
          type="button"
          className="flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          {favorites.actionLabel}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <SectionCard contentClassName="space-y-4 p-5">
        {favorites.posts.map((post) => (
          <FavoritePostRow key={post.id} post={post} />
        ))}
      </SectionCard>
    </section>
  );
}
