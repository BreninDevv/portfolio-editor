import Contact from "./contactSection/contact";
import Hero from "./heroSection/hero";
import Videos from "./videosSection/videos";
import Skills from "./skillsSection/skills";
import Niches from "./nichos/nichos";
import CustomersSection from "./clientes/customers";

export default function Home() {
  return (
    <div>
      <Hero />
      <Niches />
      <Videos />
      <CustomersSection />
      <Skills />
      <Contact />
    </div>
  );
}
