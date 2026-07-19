import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About | PaperPilot" };

export default function AboutPage() {
  return <RoutePlaceholder title="About PaperPilot" copy="PaperPilot is an AI-powered document and life admin copilot that helps people understand, decide, act, and track." />;
}
