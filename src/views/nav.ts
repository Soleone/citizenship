import type { LucideIcon } from "lucide-react";
import { House, ListChecks, Users, Zap } from "lucide-react";
import type { View } from "@/state";

/** The app's screens, kept out of component files so a hot reload does not drag them along. */
export const navItems: Array<{ value: View; label: string; icon: LucideIcon }> = [
  { value: "overview", label: "Home", icon: House },
  { value: "blitz", label: "Blitz", icon: Zap },
  { value: "together", label: "Together", icon: Users },
  { value: "runway", label: "Application", icon: ListChecks },
];
