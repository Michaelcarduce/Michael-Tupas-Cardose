import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import RecentProjects from "@/components/RecentProjects";
import OpenSource from "@/components/OpenSource";
import GitHubActivity from "@/components/GitHubActivity";
import { FloatingNav } from "@/components/ui/FloatingNavbar";

const Home = () => {
  return (
    <main
      id="main"
      className="relative bg-black-100 flex justify-center items-center flex-col overflow-clip mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <OpenSource />
        <GitHubActivity />
        <Skills />
        <Experience />
        <Approach />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
