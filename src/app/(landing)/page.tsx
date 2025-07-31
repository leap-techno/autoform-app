"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Zap,
  Shield,
  Users,
  BarChart,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Header from "./components/header";
import HeroSection from "./components/hero-section";
import LogosSection from "./components/logos-section";
import FeaturesSection from "./components/features";
import HowItWorksSection from "./components/how-it-works-section";
import TestimonialsSection from "./components/testimonials-section";
import PricingSection from "./components/pricing-section";
import FAQSection from "./components/faq-section";
import FooterSection from "./components/footer-section";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const features = [
    {
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with real-time data visualization and reporting.",
      icon: <BarChart className="size-5" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with integrated communication tools.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Enterprise Security",
      description:
        "Keep your data safe with end-to-end encryption and compliance features.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Seamless Integration",
      description:
        "Connect with your favorite tools through our extensive API ecosystem.",
      icon: <Layers className="size-5" />,
    },
    {
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team.",
      icon: <Star className="size-5" />,
    },
  ];

  return (
    <div className="w-full min-h-[100dvh]">
      <Header
        isScrolled={isScrolled}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        mounted={mounted}
        theme={theme}
      />
      <div className="container mx-auto">
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Hero Section */}
            <HeroSection />
            {/* Logos Section */}
            <LogosSection />
            {/* Features Section */}
            <FeaturesSection
              container={container}
              features={features}
              item={item}
            />
            {/* How It Works Section */}
            <HowItWorksSection />
            {/* Testimonials Section */}
            <TestimonialsSection />
            {/* Pricing Section */}
            <PricingSection />
            {/* FAQ Section */}
            <FAQSection />
            {/* CTA Section */}
            <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="container px-4 md:px-6 relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center space-y-6 text-center"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    Ready to Transform Your Workflow?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                    Join thousands of satisfied customers who have streamlined
                    their processes and boosted productivity with our platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full h-12 px-8 text-base"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                    >
                      Schedule a Demo
                    </Button>
                  </div>
                  <p className="text-sm text-primary-foreground/80 mt-4">
                    No credit card required. 14-day free trial. Cancel anytime.
                  </p>
                </motion.div>
              </div>
            </section>
          </main>
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
