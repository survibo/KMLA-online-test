import { FeatureCard } from "./components/feature-card";
import { FavoritesSection } from "./components/favorites-section";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { PaginationDots } from "./components/pagination-dots";
import { homePageContent } from "./content";

export default function HomePage() {
  const layoutStyle = {
    "--home-header-height": homePageContent.layout.headerHeight,
    "--home-footer-height": homePageContent.layout.footerHeight,
    "--home-content-top-spacing": homePageContent.layout.contentTopSpacing,
    "--home-content-bottom-spacing": homePageContent.layout.contentBottomSpacing,
  };

  return (
    <div className="min-h-screen bg-zinc-100" style={layoutStyle}>
      <div className="flex min-h-screen flex-col bg-zinc-100">
        <div className="h-[var(--home-header-height)]">
          <Header
            profile={homePageContent.profile}
            headerActions={homePageContent.headerActions}
            quickActions={homePageContent.quickActions}
          />
        </div>

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-5 px-6 pb-[var(--home-content-bottom-spacing)] pt-[var(--home-content-top-spacing)]">
          <div className="space-y-5">
            {homePageContent.featuredCards.map((card) => (
              <FeatureCard
                key={card.id}
                title={card.title}
                badge={card.badge}
                message={card.message}
                trailing={card.trailing}
                size={card.size}
              />
            ))}
          </div>

          <div>
            <PaginationDots
              total={homePageContent.carousel.total}
              activeIndex={homePageContent.carousel.activeIndex}
            />
          </div>

          <div className="flex-1">
            <FavoritesSection favorites={homePageContent.favorites} />
          </div>
        </main>

        <div className="h-[var(--home-footer-height)]">
          <Footer tabs={homePageContent.bottomTabs} />
        </div>
      </div>
    </div>
  );
}
