import { RoutePlaceholder } from "@/components/route-placeholder";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | PaperPilot" };

export default function DashboardPage() {
  return <RoutePlaceholder title="Your dashboard is next." copy="PaperPilot Landing Page V1 is ready. The product workspace will be connected here in the next development phase." />;
}
