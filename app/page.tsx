"use client";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import StorySection from "@/components/story-section";
import ScaleImpactDashboard from "@/components/scale-impact-dashboard";
import AppScreenshotsSection from "@/components/app-screenshots-section";
import SocialProofSection from "@/components/social-proof-section";
import FinalCtaSection from "@/components/final-cta-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Our Story Section */}
      <StorySection />

      {/* Scale Impact Dashboard */}
      <ScaleImpactDashboard />

      {/* App Screenshots Section */}
      <AppScreenshotsSection />

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Final CTA Section */}
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
