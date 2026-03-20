export function PaginationDots({ total, activeIndex }) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={`dot-${index}`}
            className={
              isActive
                ? "h-2.5 w-2.5 rounded-full bg-violet-600"
                : "h-2 w-2 rounded-full bg-zinc-300"
            }
          />
        );
      })}
    </div>
  );
}
