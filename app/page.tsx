"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitSection from "@/components/BenefitSection";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'page_view',
            page: '/',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
          }),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitSection />
      <TestimonialSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
