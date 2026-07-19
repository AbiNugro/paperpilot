import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import {
  AiCopilot,
  DeadlineSpotlight,
  DocumentAnalysis,
  DocumentToActions,
  HowItWorks,
  ProblemSolution,
  Security,
  Stats,
  Testimonials,
  TrustStrip,
  UseCases,
} from "@/components/landing/sections";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { FinalCta, Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustStrip />
      <ProblemSolution />
      <HowItWorks />
      <DocumentAnalysis />
      <DocumentToActions />
      <DeadlineSpotlight />
      <AiCopilot />
      <UseCases />
      <Stats />
      <Security />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
