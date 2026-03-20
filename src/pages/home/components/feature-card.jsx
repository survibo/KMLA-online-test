import { Bell } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { SectionCard } from "./section-card";

const TRAILING_ICONS = {
  bell: Bell,
};

function CardTitle({ title, badge }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[18px] font-extrabold tracking-tight">{title}</span>
      {badge ? (
        <Badge className="h-5 rounded-md bg-violet-600 px-1.5 text-[10px]">
          {badge}
        </Badge>
      ) : null}
    </div>
  );
}

function CardDescription({ message }) {
  return <p className="text-lg text-zinc-500">{message}</p>;
}

function CardTrailingValue({ value }) {
  return (
    <div className="flex min-w-20 items-center justify-center rounded-full bg-violet-50 px-4 py-3 shadow-inner">
      <span className="text-xl font-extrabold text-violet-700">{value}</span>
    </div>
  );
}

function CardTrailingIcon({ icon }) {
  const Icon = TRAILING_ICONS[icon];

  if (!Icon) {
    return null;
  }

  return (
    <div className="rounded-full p-2 text-zinc-600">
      <Icon className="h-10 w-10 stroke-[1.8]" />
    </div>
  );
}

function FeatureCardTrailing({ trailing }) {
  if (!trailing) {
    return null;
  }

  if (trailing.type === "value") {
    return <CardTrailingValue value={trailing.value} />;
  }

  if (trailing.type === "icon") {
    return <CardTrailingIcon icon={trailing.icon} />;
  }

  return null;
}

export function FeatureCard({ title, badge, message, trailing }) {
  return (
    <SectionCard contentClassName="flex items-center justify-between gap-4 p-6">
      <div className="space-y-2">
        <CardTitle title={title} badge={badge} />
        <CardDescription message={message} />
      </div>

      <FeatureCardTrailing trailing={trailing} />
    </SectionCard>
  );
}
