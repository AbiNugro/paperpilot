import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms | PaperPilot" };

export default function TermsPage() {
  return <RoutePlaceholder title="Terms" copy="PaperPilot's terms of service will be published here before launch." />;
}
