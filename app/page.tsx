import Contact from "./contactSection/contact";
import Hero from "./heroSection/hero";
import Videos from "./videosSection/videos";

export default function Home() {
  return (
    <div>
      <Hero />
      <Videos />
      <Contact />
    </div>
  );
}
