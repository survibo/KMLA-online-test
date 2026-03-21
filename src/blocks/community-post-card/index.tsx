import { cn } from "@/lib/utils"
import {
  CommunityPostGallery,
  CommunityPostHeader,
  CommunityPostStats,
} from "@/blocks/community-post-shared"
import type { CommunityPost } from "@/blocks/community-post-types"

type CommunityPostCardProps = {
  post: CommunityPost
  timeVariant?: "absolute" | "relative"
  className?: string
}

export function CommunityPostCard({
  post,
  timeVariant = "absolute",
  className,
}: CommunityPostCardProps) {
  return (
    <article
      className={cn(
        "w-full border-b border-zinc-200 bg-white text-zinc-950",
        className
      )}
    >
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-4 sm:px-6">
        <CommunityPostHeader
          author={post.author}
          createdAt={post.created_at}
          timeVariant={timeVariant}
        />

        <div className="space-y-3">
          {post.title || post.content ? (
            <div className="space-y-2">
              {post.title ? (
                <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                  {post.title}
                </h2>
              ) : null}
              {post.content ? (
                <p className="break-keep text-zinc-600">{post.content}</p>
              ) : null}
            </div>
          ) : null}

          <CommunityPostGallery
            images={post.post_images}
            altFallback={`${post.title ?? "Post"} attached image`}
          />
        </div>

        <CommunityPostStats post={post} />
      </div>
    </article>
  )
}
