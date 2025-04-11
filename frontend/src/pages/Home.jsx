import React, { useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

export default function Home() {

  return (
<motion.div className="flex flex-col h-screen w-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
  <div className="h-screen w-full snap-start">
    <HeroSection />
  </div>
  <div className="h-screen w-full snap-start">
    <FeaturesSection />
  </div>
  <div className="h-screen w-full snap-start">
    <HowItWorksSection />
  </div>
  <div className="h-screen w-full snap-start">
    <FAQSection />
  </div>
  <div className="h-screen w-full snap-start">
    <Footer />
  </div>
</motion.div>


  );
}
