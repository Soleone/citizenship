import type { ComponentProps } from "react";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

/** A quiet full-width list row, the shape every list in the app shares. */
export const rowClass =
  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted/60";

/** A list row that opens the rows under it. */
export function RowTrigger({ className, ...props }: ComponentProps<typeof CollapsibleTrigger>) {
  return <CollapsibleTrigger className={cn(rowClass, className)} {...props} />;
}
