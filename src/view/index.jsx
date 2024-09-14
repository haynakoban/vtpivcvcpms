import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import PetsFamilySection from "@/components/sections/pets-family-section";
import TestimonialsSection from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main>
      <HeroSection />

      <div className="container mx-auto">
        <ServicesSection />
      </div>

      <PetsFamilySection />

      <TestimonialsSection />
    </main>
  );
}
