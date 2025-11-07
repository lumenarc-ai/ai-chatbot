"use client";

import { Fragment, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CrossSmallIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useVoiceDebugger } from "@/hooks/use-voice-debugger";

interface PromptDebuggerProps {
  className?: string;
  onBack?: () => void;
}

export function PromptDebugger({ className, onBack }: PromptDebuggerProps) {
  const {
    state,
    setPrompt,
    updateVariable,
    addVariable,
    removeVariable,
    reinitializeSession,
    isReinitializing,
    appliedPrompt,
  } = useVoiceDebugger();

  const previewDiff = useMemo(() => {
    const lines = state.prompt.split("\n");
    return lines.map((line, index) => {
      const replacedLine = state.variables.reduce((acc, variable) => {
        if (!variable.name) return acc;
        const placeholder = new RegExp(`{{\\s*${variable.name}\\s*}}`, "g");
        return acc.replace(placeholder, variable.replacement || "");
      }, line);

      const isChanged = line !== replacedLine;
      return {
        id: `${index}-${isChanged ? "changed" : "same"}`,
        original: line,
        replaced: replacedLine,
        isChanged,
      };
    });
  }, [state.prompt, state.variables]);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-xl border border-emerald-600/40 bg-emerald-950/70 text-emerald-50 shadow-[0_0_0_1px_rgba(16,185,129,0.45)]",
        "before:absolute before:inset-px before:rounded-[10px] before:border before:border-emerald-400/30 before:opacity-60",
        "after:pointer-events-none after:absolute after:-inset-10 after:bg-[radial-gradient(circle_at_top,rgba(110,231,183,0.15),transparent_55%)]",
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-emerald-600/40 bg-emerald-900/60 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-300/80">
            Prompt Debugger
          </p>
          <h2 className="text-base font-semibold text-emerald-100">
            Template & Variable Inspector
          </h2>
        </div>
        {onBack ? (
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="border-emerald-500/60 bg-emerald-950/70 text-emerald-200 hover:bg-emerald-800/70 hover:text-emerald-50"
          >
            Back to Voice Deck
          </Button>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
        <section className="space-y-2">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-emerald-100">Prompt Template</h3>
              <p className="text-xs text-emerald-300/80">
                Update the live template before compiling the next voice turn.
              </p>
            </div>
            <div className="text-right text-xs text-emerald-400/80">
              Session v{state.sessionVersion}
            </div>
          </header>
          <Textarea
            value={state.prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="min-h-[140px] resize-y border-emerald-500/40 bg-emerald-950/80 font-mono text-sm text-emerald-50 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)] focus-visible:border-emerald-300 focus-visible:ring-emerald-400"
          />
        </section>

        <section className="space-y-3">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-emerald-100">
                Replacement Variables
              </h3>
              <p className="text-xs text-emerald-300/80">
                Each variable compiles into the prompt when the session restarts.
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="border-emerald-500/70 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-800/80 hover:text-emerald-50"
              onClick={addVariable}
            >
              Add Variable
            </Button>
          </header>

          <div className="grid gap-2">
            {state.variables.length === 0 ? (
              <div className="rounded-lg border border-dashed border-emerald-500/40 bg-emerald-900/40 p-4 text-center text-sm text-emerald-200">
                No runtime variables defined. Add one to start personalizing the prompt.
              </div>
            ) : (
              state.variables.map((variable) => {
                const handleId = `variable-${variable.id}-handle`;
                const replacementId = `variable-${variable.id}-replacement`;

                return (
                  <Fragment key={variable.id}>
                    <div className="relative grid gap-3 rounded-lg border border-emerald-600/40 bg-emerald-950/40 p-4 shadow-[0_8px_20px_rgba(16,185,129,0.05)] lg:grid-cols-[1.2fr,1fr]">
                      <div className="space-y-2">
                        <label
                          className="text-xs font-semibold uppercase tracking-wider text-emerald-300/70"
                          htmlFor={handleId}
                        >
                          Variable Handle
                        </label>
                        <Input
                          id={handleId}
                          value={variable.name}
                          onChange={(event) =>
                            updateVariable(variable.id, { name: event.target.value })
                          }
                          placeholder="user_name"
                          className="border-emerald-500/40 bg-emerald-950/70 text-sm font-mono text-emerald-50 focus-visible:border-emerald-300 focus-visible:ring-emerald-400"
                        />
                        <p className="text-xs text-emerald-300/70">
                          Rendered as <span className="font-semibold">{`{{${variable.name || "variable"}}}`}</span> inside the template.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          className="text-xs font-semibold uppercase tracking-wider text-emerald-300/70"
                          htmlFor={replacementId}
                        >
                          Replacement Value
                        </label>
                        <Input
                          id={replacementId}
                          value={variable.replacement}
                          onChange={(event) =>
                            updateVariable(variable.id, {
                              replacement: event.target.value,
                            })
                          }
                          placeholder="Alex"
                          className="border-emerald-500/40 bg-emerald-950/70 text-sm font-mono text-emerald-50 focus-visible:border-emerald-300 focus-visible:ring-emerald-400"
                        />
                        {variable.description ? (
                          <p className="text-xs text-emerald-400/70">
                            {variable.description}
                          </p>
                        ) : null}
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariable(variable.id)}
                        className="absolute right-2 top-2 text-emerald-300/70 transition hover:text-emerald-50"
                      >
                        <CrossSmallIcon />
                      </Button>
                    </div>
                  </Fragment>
                );
              })
            )}
          </div>
        </section>

        <section className="space-y-3">
          <header>
            <h3 className="text-sm font-semibold text-emerald-100">
              Compiled Preview
            </h3>
            <p className="text-xs text-emerald-300/80">
              Visual diff between the raw template and its compiled output.
            </p>
          </header>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-lg border border-emerald-600/40 bg-emerald-950/50 p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                Template
              </h4>
              <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap break-words bg-emerald-950/60 p-3 text-[13px] leading-relaxed text-emerald-200 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)]">
                {state.prompt}
              </pre>
            </div>

            <div className="rounded-lg border border-emerald-600/40 bg-emerald-950/50 p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                Compiled Output
              </h4>
              <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap break-words bg-emerald-950/60 p-3 text-[13px] leading-relaxed text-emerald-100 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)]">
                {appliedPrompt}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-emerald-600/30 bg-emerald-950/40 p-3">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/70">
              Line Diff
            </h4>
            <ul className="grid gap-1 text-[13px] text-emerald-200/90">
              {previewDiff.map((line) => (
                <li
                  key={line.id}
                  className={cn(
                    "flex flex-col rounded-md border border-transparent bg-emerald-900/40 px-3 py-2",
                    line.isChanged && "border-emerald-500/30 bg-emerald-900/60",
                  )}
                >
                  <span className="font-mono text-xs text-emerald-400/80">
                    {line.original || ""}
                  </span>
                  {line.isChanged ? (
                    <span className="font-mono text-xs text-emerald-200">
                      → {line.replaced}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="relative z-10 border-t border-emerald-600/40 bg-emerald-900/60 px-4 py-3">
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-emerald-300/80">
            Last initialized at {new Date(state.lastInitializedAt).toLocaleTimeString()}
          </div>
          <Button
            type="button"
            onClick={reinitializeSession}
            disabled={isReinitializing}
            className="w-full border border-emerald-400/60 bg-gradient-to-r from-emerald-500/90 via-emerald-400/90 to-emerald-500/90 text-emerald-950 shadow-[0_8px_25px_rgba(16,185,129,0.35)] transition hover:from-emerald-400 hover:to-emerald-500 sm:w-auto"
          >
            {isReinitializing ? "Reinitializing…" : "Reinitialize Voice Session"}
          </Button>
        </div>
      </div>
    </div>
  );
}
