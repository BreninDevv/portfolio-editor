import Contact from "./contactSection/contact";
import Hero from "./heroSection/hero";
import Videos from "./videosSection/videos";
import Skills from "./skillsSection/skills";

export default function Home() {
  return (
    <div>
      <Hero />
      <Skills />
      <Videos />
      <Contact />
    </div>
  );
}
