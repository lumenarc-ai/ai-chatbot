"use client";

import { useMemo, useState } from "react";
import { PromptDebugger } from "@/components/debugger/prompt-debugger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVoiceDebugger } from "@/hooks/use-voice-debugger";
import { BotIcon } from "@/components/icons";

const STATUS_META = {
  idle: {
    label: "Idle",
    className:
      "border-emerald-400/40 bg-emerald-500/10 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
  },
  listening: {
    label: "Listening",
    className:
      "border-sky-400/40 bg-sky-500/10 text-sky-100 shadow-[0_0_20px_rgba(14,165,233,0.35)]",
  },
  processing: {
    label: "Processing",
    className:
      "border-amber-400/40 bg-amber-500/10 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.35)]",
  },
  reinitializing: {
    label: "Reinitializing",
    className:
      "border-cyan-400/40 bg-cyan-500/10 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.35)]",
  },
} as const;

interface VoiceDebuggerProps {
  className?: string;
}

export function VoiceDebugger({ className }: VoiceDebuggerProps) {
  const { state, appliedPrompt } = useVoiceDebugger();
  const [activePanel, setActivePanel] = useState<"voice" | "prompt">("voice");

  const status = STATUS_META[state.status] ?? STATUS_META.idle;

  const transcriptEntries = useMemo(
    () => state.transcript.slice(0, 6),
    [state.transcript],
  );

  const promptSnippet = useMemo(() => {
    const normalized = appliedPrompt.trim();
    if (!normalized) return "Prompt template is empty.";

    const firstLines = normalized.split("\n").slice(0, 3);
    const trailing = normalized.split("\n").length > 3 ? " …" : "";
    return `${firstLines.join(" ")}${trailing}`;
  }, [appliedPrompt]);

  if (activePanel === "prompt") {
    return (
      <PromptDebugger
        className={cn("h-full min-h-[360px]", className)}
        onBack={() => setActivePanel("voice")}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border border-emerald-600/40 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-emerald-50 shadow-[0_15px_50px_rgba(6,95,70,0.35)]",
        "before:absolute before:inset-px before:rounded-[10px] before:border before:border-emerald-400/30 before:bg-emerald-900/30 before:backdrop-blur-sm",
        "after:pointer-events-none after:absolute after:-inset-16 after:bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.22),transparent_60%)]",
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-600/30 bg-emerald-950/60 p-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-lg border border-emerald-500/50 bg-emerald-900/80 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            <BotIcon />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">
              Voice Debugger
            </p>
            <h2 className="text-lg font-semibold text-emerald-50">
              Operator Console
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-semibold uppercase tracking-widest",
              status.className,
            )}
          >
            <span className="size-2 rounded-full bg-current" />
            {status.label}
          </span>
          <span className="text-emerald-300/70">
            Session v{state.sessionVersion}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <section className="grid gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/40 p-4 shadow-[0_12px_30px_rgba(16,185,129,0.08)] md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300/70">
              Session Identifier
            </p>
            <p className="font-mono text-sm text-emerald-100">
              {state.sessionId.slice(0, 8)} · {state.sessionId.slice(-4)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300/70">
              Last Initialization
            </p>
            <p className="text-sm text-emerald-100">
              {new Date(state.lastInitializedAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300/70">
              Active Prompt Snapshot
            </p>
            <p className="rounded-lg border border-emerald-500/20 bg-emerald-900/60 p-3 text-sm text-emerald-200">
              {promptSnippet}
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-950/40 p-4 shadow-[0_12px_30px_rgba(16,185,129,0.08)]">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-emerald-100">
                Session Timeline
              </h3>
              <p className="text-xs text-emerald-300/70">
                Real-time breadcrumbs for the voice orchestration engine.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-emerald-500/60 bg-emerald-950/70 text-emerald-200 hover:bg-emerald-800/80 hover:text-emerald-50"
              onClick={() => setActivePanel("prompt")}
            >
              Prompt Debugger
            </Button>
          </header>

          <ul className="grid gap-2">
            {transcriptEntries.length === 0 ? (
              <li className="rounded-lg border border-dashed border-emerald-500/30 bg-emerald-900/30 p-4 text-center text-sm text-emerald-200">
                Timeline is quiet. Awaiting new voice events.
              </li>
            ) : (
              transcriptEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-900/40 px-3 py-2 text-sm text-emerald-100"
                >
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-emerald-400" />
                  <span className="flex-1 leading-relaxed">{entry.message}</span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <div className="relative z-10 border-t border-emerald-600/30 bg-emerald-950/70 px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-emerald-300/80">
            {state.variables.length} runtime variables attached · {state.transcript.length} recent events
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full border-emerald-500/60 bg-emerald-950/70 text-emerald-200 hover:bg-emerald-800/80 hover:text-emerald-50 sm:w-auto"
              onClick={() => setActivePanel("prompt")}
            >
              Open Prompt Debugger
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
