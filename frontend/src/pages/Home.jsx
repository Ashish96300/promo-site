import HeroSection from "../features/Hero/HeroSection";
import ProjectsSection from "../features/Projects/ProjectSection";
import Navbar from "../layout/Navbar";
import AboutSection from "../features/About/AboutSection";
import ServicesSection from "../features/Services/ServicesSection";
import TestimonialsSection from "../features/Testimonials/Testimonials";
import Footer from "../layout/Footer/Footer";

function Home() {
  return (
    <main>
       <Navbar/>
      <HeroSection />
      <ServicesSection/>
      <AboutSection/>
      <ProjectsSection />
      <TestimonialsSection/>
      <Footer/>
    </main>
  );
}

export default Home;