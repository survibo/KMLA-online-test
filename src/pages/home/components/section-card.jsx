import { Card, CardContent } from "@/components/ui/card";

const CARD_CLASS_NAME =
  "rounded-[24px] border-0 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]";

export function SectionCard({ children, contentClassName = "" }) {
  return (
    <Card className={CARD_CLASS_NAME}>
      <CardContent className={contentClassName.trim()}>{children}</CardContent>
    </Card>
  );
}
