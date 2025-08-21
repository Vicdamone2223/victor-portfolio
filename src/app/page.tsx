import Hero from "../components/Hero";
import ToolsMarquee from "../components/ToolsMarquee";
import ProjectsList from "../components/ProjectsList";
import ContactCard from "../components/ContactCard"; // <- add this

export default function Page() {
  return (
    <main className="bg-[#0b1625] text-white">
      <Hero />
      <ToolsMarquee />
      <ProjectsList />
      <ContactCard /> {/* replaces the old contact section */}
    </main>
  );
}
