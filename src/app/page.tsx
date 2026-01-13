import Hero from "@/components/Hero";
import TheScience from "@/components/TheScience";
import TheService from "@/components/TheService";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <TheScience />
      <TheService />
    </main>
  );
}