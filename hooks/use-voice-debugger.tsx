"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { generateUUID } from "@/lib/utils";
import { toast } from "@/components/toast";

export type PromptVariable = {
  id: string;
  name: string;
  replacement: string;
  description?: string;
};

export type VoiceDebuggerStatus =
  | "idle"
  | "listening"
  | "processing"
  | "reinitializing";

interface VoiceDebuggerState {
  sessionId: string;
  sessionVersion: number;
  prompt: string;
  variables: Array<PromptVariable>;
  transcript: Array<{ id: string; message: string }>;
  status: VoiceDebuggerStatus;
  lastInitializedAt: number;
}

interface VoiceDebuggerContextValue {
  state: VoiceDebuggerState;
  setPrompt: (prompt: string) => void;
  updateVariable: (id: string, value: Partial<PromptVariable>) => void;
  addVariable: () => void;
  removeVariable: (id: string) => void;
  reinitializeSession: () => Promise<void>;
  isReinitializing: boolean;
  appliedPrompt: string;
  appendTranscript: (message: string) => void;
  setStatus: (status: VoiceDebuggerStatus) => void;
}

const VoiceDebuggerContext = createContext<VoiceDebuggerContextValue | null>(
  null,
);

function createInitialVariables(): Array<PromptVariable> {
  return [
    {
      id: generateUUID(),
      name: "user_name",
      replacement: "Alex",
      description: "Human facing name of the speaker",
    },
    {
      id: generateUUID(),
      name: "product_name",
      replacement: "PromptForge",
      description: "Product name referenced in marketing lines",
    },
  ];
}

function createInitialState(): VoiceDebuggerState {
  return {
    sessionId: generateUUID(),
    sessionVersion: 1,
    prompt: `You are the orchestrator for our immersive voice experience.\n\n- Greet the user with energy and reference {{product_name}} immediately.\n- Keep every response under 25 words.\n- When the user shares their name, store it as {{user_name}}.\n- If the user appears confused, trigger the tutorial flow.`,
    variables: createInitialVariables(),
    transcript: [
      { id: generateUUID(), message: "[12:00:11] Session booted" },
      { id: generateUUID(), message: "[12:00:23] Wake word detected" },
      { id: generateUUID(), message: "[12:00:26] Prompt template compiled" },
    ],
    status: "idle",
    lastInitializedAt: Date.now(),
  };
}

export function VoiceDebuggerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<VoiceDebuggerState>(createInitialState);
  const [isReinitializing, setIsReinitializing] = useState(false);

  const setPrompt = (prompt: string) => {
    setState((current) => ({
      ...current,
      prompt,
    }));
  };

  const updateVariable = (id: string, value: Partial<PromptVariable>) => {
    setState((current) => ({
      ...current,
      variables: current.variables.map((variable) =>
        variable.id === id ? { ...variable, ...value } : variable,
      ),
    }));
  };

  const addVariable = () => {
    setState((current) => ({
      ...current,
      variables: [
        ...current.variables,
        {
          id: generateUUID(),
          name: "new_variable",
          replacement: "",
        },
      ],
    }));
  };

  const removeVariable = (id: string) => {
    setState((current) => ({
      ...current,
      variables: current.variables.filter((variable) => variable.id !== id),
    }));
  };

  const appendTranscript = (message: string) => {
    setState((current) => ({
      ...current,
      transcript: [
        { id: generateUUID(), message },
        ...current.transcript,
      ].slice(0, 100),
    }));
  };

  const setStatus = (status: VoiceDebuggerStatus) => {
    setState((current) => ({
      ...current,
      status,
    }));
  };

  const appliedPrompt = useMemo(() => {
    return state.variables.reduce((prompt, variable) => {
      if (!variable.name) return prompt;

      const placeholder = new RegExp(`{{\\s*${variable.name}\\s*}}`, "g");
      return prompt.replace(placeholder, variable.replacement ?? "");
    }, state.prompt);
  }, [state.prompt, state.variables]);

  const reinitializeSession = async () => {
    if (isReinitializing) return;

    setIsReinitializing(true);
    setState((current) => ({
      ...current,
      status: "reinitializing",
    }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      setState((current) => ({
        ...current,
        sessionVersion: current.sessionVersion + 1,
        lastInitializedAt: Date.now(),
        status: "idle",
        transcript: [
          {
            id: generateUUID(),
            message: `[${new Date().toLocaleTimeString()}] Session reinitialized`,
          },
          ...current.transcript,
        ].slice(0, 100),
      }));

      toast({
        type: "success",
        description: "Voice session reinitialized with updated prompt.",
      });
    } catch (error) {
      console.error(error);
      toast({
        type: "error",
        description: "Failed to reinitialize the voice session.",
      });
      setState((current) => ({
        ...current,
        status: "idle",
      }));
    } finally {
      setIsReinitializing(false);
    }
  };

  const value: VoiceDebuggerContextValue = {
    state,
    setPrompt,
    updateVariable,
    addVariable,
    removeVariable,
    reinitializeSession,
    isReinitializing,
    appliedPrompt,
    appendTranscript,
    setStatus,
  };

  return (
    <VoiceDebuggerContext.Provider value={value}>
      {children}
    </VoiceDebuggerContext.Provider>
  );
}

export function useVoiceDebugger() {
  const context = useContext(VoiceDebuggerContext);
  if (!context) {
    throw new Error(
      "useVoiceDebugger must be used within a VoiceDebuggerProvider",
    );
  }

  return context;
}
