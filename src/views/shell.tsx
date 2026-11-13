import { useState, type ReactNode } from "react";
import {
  AudioLines,
  Flame,
  Headphones,
  LoaderCircle,
  Menu,
  Mic,
  Pause,
  Settings2,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { ThemePicker } from "@/components/soleone/theme-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { dayStreak, levelFor, type GameStats } from "@/game";
import { viewPath } from "@/routes";
import {
  activeProfileIds,
  activeProfileLabel,
  normalizeRelayState,
  type ActiveProfile,
  type ProfileId,
  type RelayState,
  type View,
} from "@/state";
import { householdLink, joinHousehold, type SyncStatus } from "@/sync";
import { saying } from "@/listen";
import { toggleVoice, useVoice } from "@/voice";
import { navItems } from "./nav";

/** The column every list screen sits in, under the header. */
export function Page({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-5 pb-16 sm:px-8">
      {header}
      <main className="flex flex-col gap-8">{children}</main>
    </div>
  );
}

/** The column a session, test or blitz runs in: nothing but the bar and the work. */
export function PlayPage({ bar, children }: { bar: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col px-5 pb-16 sm:px-8">
      {bar}
      <main className="flex flex-col gap-6">{children}</main>
    </div>
  );
}

/** Close, how far along, and one number on the right: time left, score or streak. */
export function PlayBar({
  value,
  label,
  onClose,
  children,
}: {
  value: number;
  label: string;
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 py-6">
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Leave">
        <X />
      </Button>
      <Progress value={value} aria-label={label} className="flex-1" />
      <div className="flex min-w-12 items-center justify-end gap-2 text-sm text-muted-foreground tabular-nums">
        {children}
      </div>
    </div>
  );
}

/** Voice mode on and off, and what it is doing: loading, speaking or listening. */
export function VoiceToggle() {
  return (
    <>
      <VoiceButton />
      <VoiceListening />
    </>
  );
}

function VoiceButton() {
  const voice = useVoice();
  const on = voice.kind !== "off";
  const icon = {
    off: <Headphones />,
    loading: <LoaderCircle className="animate-spin" />,
    idle: <Headphones />,
    speaking: <AudioLines />,
    listening: <Mic />,
    thinking: <LoaderCircle className="animate-spin" />,
    paused: <Pause />,
  }[voice.kind];
  return (
    <span className="relative inline-flex">
      <Button
        variant={on ? "secondary" : "ghost"}
        size={voice.kind === "loading" ? "sm" : "icon"}
        aria-label={on ? "Voice mode on" : "Voice mode"}
        aria-pressed={on}
        onClick={() => void toggleVoice()}
      >
        {icon}
        {voice.kind === "loading" && `${Math.round(voice.percent)}%`}
      </Button>
      {/* On air: the icons alone look too alike to tell on from off at a glance. */}
      {on && voice.kind !== "loading" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-0.5 -right-0.5 size-3 animate-pulse rounded-full bg-destructive ring-2 ring-background"
        />
      )}
    </span>
  );
}

/** While the mic is open or paused: a bar you can see from the driver's seat, with what you can say. */
function VoiceListening() {
  const voice = useVoice();
  if (voice.kind !== "listening" && voice.kind !== "thinking" && voice.kind !== "paused")
    return null;
  // True/false questions also take Alpha and Bravo, but showing those would only confuse.
  const commands =
    voice.kind === "listening"
      ? voice.commands.filter((c) => !(voice.commands.includes("true") && (c === "A" || c === "B")))
      : [];
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 bg-primary px-4 py-6 text-primary-foreground shadow-lg animate-in slide-in-from-bottom-4"
    >
      <span className="flex items-center gap-2 text-2xl font-semibold">
        {
          {
            listening: <Mic className="size-6 animate-pulse" />,
            thinking: <LoaderCircle className="size-6 animate-spin" />,
            paused: <Pause className="size-6" />,
          }[voice.kind]
        }
        {{ listening: "Speak now", thinking: "Got it", paused: "Paused" }[voice.kind]}
      </span>
      {voice.kind !== "thinking" && (
        <span className={voice.kind === "paused" ? "text-base" : "text-base capitalize"}>
          {voice.kind === "paused" ? "Say resume" : commands.map(saying).join(" · ")}
        </span>
      )}
      {voice.kind === "listening" && voice.missed && (
        <span className="text-sm opacity-80">Didn't catch "{voice.missed}"</span>
      )}
    </div>
  );
}

export function Header({
  profile,
  profileNames,
  players,
  game,
  now,
  sound,
  onProfileChange,
  onOpen,
  onToggleSound,
  onOpenSettings,
}: {
  profile: ActiveProfile;
  profileNames: Record<ProfileId, string>;
  players: ProfileId[];
  game: Record<ProfileId, GameStats>;
  now: number;
  sound: boolean;
  onProfileChange: (profile: ActiveProfile) => void;
  onOpen: (view: View) => void;
  onToggleSound: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-3 py-6 sm:py-8">
      <Link
        to={viewPath("overview")}
        className="flex items-center gap-2.5 text-xl font-semibold tracking-tight sm:text-2xl"
      >
        <img src={`${import.meta.env.BASE_URL}maple-leaf.svg`} alt="" className="size-7" />
        Citizenship
      </Link>
      <div className="flex items-center gap-1">
        {players.map((player) => {
          const streak = dayStreak(game[player], now);
          return (
            <span
              key={player}
              className="hidden items-center gap-1 px-2 text-sm text-muted-foreground tabular-nums sm:flex"
              title={`${profileNames[player]}: level ${levelFor(game[player].xp).level}, ${streak}-day streak`}
            >
              <Flame className={streak > 0 ? "size-4 text-primary" : "size-4"} aria-hidden="true" />
              {streak}
            </span>
          );
        })}
        <Select
          value={profile}
          onValueChange={(value) => value && onProfileChange(value as ActiveProfile)}
        >
          <SelectTrigger size="sm" aria-label="Studying as">
            <SelectValue>
              {(value: ActiveProfile) => activeProfileLabel(value, profileNames)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {activeProfileIds.map((id) => (
              <SelectItem key={id} value={id}>
                {activeProfileLabel(id, profileNames)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <VoiceToggle />
        <ThemePicker tagline={{ text: "Study a little,", highlight: "pass the test" }} />
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Menu" />}>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.value} onClick={() => onOpen(item.value)}>
                <item.icon />
                {item.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onToggleSound}>
              {sound ? <Volume2 /> : <VolumeX />}
              {sound ? "Sound on" : "Sound off"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenSettings}>
              <Settings2 />
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function SettingsDialog({
  open,
  onOpenChange,
  relayState,
  syncStatus,
  onRestore,
  onNameChange,
  onTargetDateChange,
  onCoachModeChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relayState: RelayState;
  syncStatus: SyncStatus;
  onRestore: (state: RelayState) => void;
  onNameChange: (target: ProfileId, value: string) => void;
  onTargetDateChange: (value: string) => void;
  onCoachModeChange: (checked: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>{syncLine(syncStatus)}</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="profile-you">First learner</FieldLabel>
            <Input
              id="profile-you"
              value={relayState.profileNames.you}
              onChange={(event) => onNameChange("you", event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="profile-partner">Second learner</FieldLabel>
            <Input
              id="profile-partner"
              value={relayState.profileNames.partner}
              onChange={(event) => onNameChange("partner", event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="target-date">Test date</FieldLabel>
            <Input
              id="target-date"
              type="date"
              value={relayState.targetDate}
              onChange={(event) => onTargetDateChange(event.target.value)}
            />
            <FieldDescription>Home counts down to it once it is set.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Switch
              id="coach-mode"
              checked={relayState.coachMode}
              onCheckedChange={onCoachModeChange}
            />
            <FieldContent>
              <FieldLabel htmlFor="coach-mode">Listener hints in Together</FieldLabel>
            </FieldContent>
          </Field>
          {syncStatus.kind === "local" || syncStatus.kind === "wrong-key" ? (
            <JoinHousehold />
          ) : (
            <AddDevice />
          )}
          <Backup relayState={relayState} onRestore={onRestore} />
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}

function syncLine(status: SyncStatus) {
  switch (status.kind) {
    case "local":
      return "Saved on this device only. Open or paste your household link to share progress across devices.";
    case "syncing":
      return "Syncing with your household…";
    case "synced":
      return "Synced with your household. Application dates stay on this device.";
    case "offline":
      return "Offline. Progress is saved here and syncs when the connection is back.";
    case "wrong-key":
      return "The household link on this device was refused. Open or paste the link again.";
  }
}

/** The Android app can't open the household link, so it takes it pasted. */
function JoinHousehold() {
  const [link, setLink] = useState("");
  const [refused, setRefused] = useState(false);
  return (
    <Field>
      <FieldLabel htmlFor="household-link">Household link</FieldLabel>
      <div className="flex gap-2">
        <Input
          id="household-link"
          value={link}
          placeholder="Paste the link from another device"
          onChange={(event) => setLink(event.target.value)}
        />
        <Button variant="outline" onClick={() => setRefused(!joinHousehold(link))}>
          Join
        </Button>
      </div>
      {refused && <FieldDescription>That is not a household link.</FieldDescription>}
    </Field>
  );
}

function AddDevice() {
  const [copied, setCopied] = useState(false);
  const link = householdLink();
  if (!link) return null;
  return (
    <Field>
      <FieldLabel>Another phone or laptop</FieldLabel>
      <Button
        variant="outline"
        onClick={() => {
          void navigator.clipboard.writeText(link).then(() => setCopied(true));
        }}
      >
        {copied ? "Link copied" : "Copy household link"}
      </Button>
      <FieldDescription>
        Open it there once. Anyone with the link sees your progress.
      </FieldDescription>
    </Field>
  );
}

/** A file copy of everything, application dates included, for when a browser loses its storage. */
function Backup({
  relayState,
  onRestore,
}: {
  relayState: RelayState;
  onRestore: (state: RelayState) => void;
}) {
  const [message, setMessage] = useState<string | null>(null);
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(relayState, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `citizenship-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const restore = async (file: File) => {
    try {
      onRestore(normalizeRelayState(JSON.parse(await file.text())));
      setMessage("Restored from the backup.");
    } catch {
      setMessage("That file is not a Citizenship backup.");
    }
  };
  return (
    <Field>
      <FieldLabel htmlFor="restore-backup">Backup</FieldLabel>
      <div className="flex gap-2">
        <Button variant="outline" onClick={download}>
          Download backup
        </Button>
        <Button variant="outline" render={<label htmlFor="restore-backup" />}>
          Restore…
        </Button>
      </div>
      <Input
        id="restore-backup"
        type="file"
        accept="application/json"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void restore(file);
          event.target.value = "";
        }}
      />
      <FieldDescription>
        {message ?? "A file with both learners' progress and application dates."}
      </FieldDescription>
    </Field>
  );
}

/** An address that is not a screen says so, rather than quietly showing Home. */
export function MissingScreen({ path }: { path: string }) {
  return (
    <section className="flex flex-col items-start gap-4 py-12">
      <h1 className="text-2xl font-semibold">Nothing at {path}</h1>
      <p className="text-muted-foreground">The link may be from an older version of the app.</p>
      <Button render={<Link to={viewPath("overview")} />}>Go home</Button>
    </section>
  );
}

/** A toast that fades in at the bottom for the big moments: a level, the daily goal. */
export function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg animate-in fade-in slide-in-from-bottom-4"
    >
      {message}
    </div>
  );
}
