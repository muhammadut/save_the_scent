import Hero from "@/components/Hero";
import TheScience from "@/components/TheScience";
import TheService from "@/components/TheService";
import ScentGrid from "@/components/ScentGrid";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <TheScience />
      <TheService />
      <ScentGrid />
    </main>
  );
}