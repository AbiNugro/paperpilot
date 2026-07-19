import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Help Center | PaperPilot" };

export default function HelpPage() {
  return <RoutePlaceholder title="Help Center" copy="PaperPilot support documentation will be published alongside the application." />;
}
