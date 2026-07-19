import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sign in | PaperPilot" };

export default function LoginPage() {
  return <RoutePlaceholder title="Sign in is coming next." copy="Authentication will be connected when the PaperPilot application workspace is implemented." />;
}
