import Contact from "./contactSection/contact";
import Hero from "./heroSection/hero";
import Videos from "./videosSection/videos";
import Skills from "./skillsSection/skills";
import Marquee from "./marquee/marquee";
import Showreel from "./showreel/showreel";
import CustomersSection from "./clientes/customers";

export default function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <Showreel />
      <Marquee />
      <Skills />
      <Marquee />
      <Videos />
      <Marquee />
      <Contact />
    </div>
  );
}
