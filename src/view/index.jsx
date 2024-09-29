import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import PetsFamilySection from "@/components/sections/pets-family-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  useEffect(() => {
    if(user){
      navigate('/auth/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user]);

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
