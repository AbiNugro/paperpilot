import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy | PaperPilot" };

export default function PrivacyPage() {
  return <RoutePlaceholder title="Privacy" copy="PaperPilot's product-specific privacy and data-retention details will be documented here before launch." />;
}
