import CTA from "../components/CTA";
import Hero from "../components/Hero";
import Services from "../components/Services";
import SplitSection from "../components/SplitSection";
import WhyChoose from "../components/WhyChoose";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <SplitSection />
      <CTA />
    </>
  );
}
