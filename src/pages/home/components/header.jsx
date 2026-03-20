import {
  ClipboardList,
  Globe,
  Library,
  Menu,
  Music4,
  Search,
  User,
} from "lucide-react";

const QUICK_ACTION_ICONS = {
  globe: Globe,
  library: Library,
  "clipboard-list": ClipboardList,
  "music-4": Music4,
};

const HEADER_ACTION_ICONS = {
  search: Search,
  user: User,
  menu: Menu,
};

function HeaderActionButton({ icon, label }) {
  const Icon = HEADER_ACTION_ICONS[icon];

  return (
    <button
      type="button"
      aria-label={label}
      className="text-zinc-600 transition-colors hover:text-zinc-900"
    >
      <Icon className="h-6 w-6" />
    </button>
  );
}

function QuickActionButton({ icon, label }) {
  const Icon = QUICK_ACTION_ICONS[icon];

  return (
    <button
      type="button"
      aria-label={label}
      className="flex flex-col items-center gap-2 text-center text-zinc-600 transition-colors hover:text-zinc-900"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl">
        <Icon className="h-8 w-8 stroke-[1.8]" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export function Header({ profile, headerActions, quickActions }) {
  return (
    <header className="flex h-full flex-col justify-center px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <h1 className="text-[22px] font-extrabold tracking-tight">
            {profile.name}
          </h1>
          <span className="pb-0.5 text-sm text-zinc-500">
            {profile.studentId}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {headerActions.map((action) => (
            <HeaderActionButton
              key={action.id}
              icon={action.icon}
              label={action.label}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4 px-2">
        {quickActions.map((action) => (
          <QuickActionButton
            key={action.id}
            icon={action.icon}
            label={action.label}
          />
        ))}
      </div>
    </header>
  );
}
