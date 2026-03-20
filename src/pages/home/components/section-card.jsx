import { Card, CardContent } from "@/components/ui/card";

const CARD_CLASS_NAME =
  "rounded-[24px] border-0 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]";

export function SectionCard({
  children,
  className = "",
  contentClassName = "",
  style,
}) {
  return (
    <Card className={`${CARD_CLASS_NAME} ${className}`.trim()} style={style}>
      <CardContent className={contentClassName.trim()} style={style}>
        {children}
      </CardContent>
    </Card>
  );
}
