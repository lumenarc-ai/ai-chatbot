"use client";

import { ReactNode } from "react";
import { DemoGraphSidebar } from "./demo-graph-sidebar";

interface TwoColumnLayoutProps {
  children: ReactNode;
}

export function TwoColumnLayout({ children }: TwoColumnLayoutProps) {
  return <DemoGraphSidebar>{children}</DemoGraphSidebar>;
}
