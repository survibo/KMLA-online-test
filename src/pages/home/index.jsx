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
    "--home-featured-section-min-height":
      homePageContent.layout.featuredSectionMinHeight,
    "--home-carousel-section-min-height":
      homePageContent.layout.carouselSectionMinHeight,
    "--home-favorites-section-min-height":
      homePageContent.layout.favoritesSectionMinHeight,
  };

  return (
    <div className="min-h-screen bg-zinc-100" style={layoutStyle}>
      <div className="grid min-h-screen bg-zinc-100 [grid-template-rows:var(--home-header-height)_minmax(0,1fr)_var(--home-footer-height)]">
        <div className="min-h-[var(--home-header-height)]">
          <Header
            profile={homePageContent.profile}
            headerActions={homePageContent.headerActions}
            quickActions={homePageContent.quickActions}
          />
        </div>

        <div className="min-h-0">
          <main className="mx-auto flex h-full w-full max-w-5xl flex-col gap-5 overflow-y-auto px-6 pb-[var(--home-content-bottom-spacing)] pt-[var(--home-content-top-spacing)]">
            <section className="min-h-[var(--home-featured-section-min-height)] space-y-5">
              {homePageContent.featuredCards.map((card) => (
                <FeatureCard
                  key={card.id}
                  title={card.title}
                  badge={card.badge}
                  message={card.message}
                  trailing={card.trailing}
                />
              ))}
            </section>

            <section className="min-h-[var(--home-carousel-section-min-height)]">
              <PaginationDots
                total={homePageContent.carousel.total}
                activeIndex={homePageContent.carousel.activeIndex}
              />
            </section>

            <section className="min-h-[var(--home-favorites-section-min-height)]">
              <FavoritesSection favorites={homePageContent.favorites} />
            </section>
          </main>
        </div>

        <div className="min-h-[var(--home-footer-height)]">
          <Footer tabs={homePageContent.bottomTabs} />
        </div>
      </div>
    </div>
  );
}
