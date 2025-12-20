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
       <section id="home"> <HeroSection /> </section>
      <ServicesSection/>
      <section id="about"> <AboutSection /> </section>
      <section id="projects"> <ProjectsSection /> </section>
      <section id="testimonial"> <TestimonialsSection /> </section>
      <Footer/>
    </main>
  );
}

export default Home;