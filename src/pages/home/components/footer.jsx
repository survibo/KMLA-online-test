import {
  Box,
  CircleUserRound,
  FileText,
  Home,
  MessageCircle,
} from "lucide-react";

const TAB_ICONS = {
  home: Home,
  box: Box,
  "file-text": FileText,
  "message-circle": MessageCircle,
  "circle-user-round": CircleUserRound,
};

function FooterTabButton({ tab }) {
  const Icon = TAB_ICONS[tab.icon];
  const iconClassName = tab.isActive
    ? "h-7 w-7 fill-black text-black"
    : "h-7 w-7";

  return (
    <button
      type="button"
      aria-label={tab.label}
      className="relative text-zinc-500 transition-colors hover:text-zinc-900"
    >
      <Icon className={iconClassName} />

      {tab.notificationDot ? (
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500" />
      ) : null}

      {tab.badgeCount ? (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-white">
          {tab.badgeCount}
        </span>
      ) : null}
    </button>
  );
}

export function Footer({ tabs }) {
  return (
    <footer className="flex h-full flex-col justify-center rounded-t-[28px] bg-white px-8 pb-8 pt-5 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
      <nav className="flex items-center justify-between" aria-label="하단 메뉴">
        {tabs.map((tab) => (
          <FooterTabButton key={tab.id} tab={tab} />
        ))}
      </nav>
    </footer>
  );
}
