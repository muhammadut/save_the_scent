"use client";

import React from "react";

const PackageCard = ({ title, price, features, isPopular = false }: { title: string, price: string, features: string[], isPopular?: boolean }) => (
  <div className={`relative p-12 border ${isPopular ? 'border-white/40 bg-white/5' : 'border-white/10'} flex flex-col items-center text-center transition-all duration-500 hover:border-white/40 hover:bg-white/5 group`}>
    {isPopular && (
      <span className="absolute top-0 -translate-y-1/2 bg-off-white text-black font-mono text-[10px] uppercase tracking-widest px-4 py-1">
        Most Popular
      </span>
    )}
    
    <h3 className="font-serif text-4xl mb-4 text-off-white">{title}</h3>
    <div className="font-mono text-xl text-zinc-400 mb-8 tracking-widest">{price}</div>
    
    <ul className="space-y-4 mb-12 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="font-sans text-sm text-zinc-300 font-light flex items-center justify-center gap-2">
          <span className="w-1 h-1 bg-zinc-500 rounded-full" />
          {feature}
        </li>
      ))}
    </ul>
    
    <button className={`px-8 py-3 w-full border ${isPopular ? 'bg-off-white text-black border-off-white' : 'border-white/20 text-off-white'} font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors`}>
      Select
    </button>
  </div>
);

const Packages = () => {
  return (
    <section className="bg-black py-40 px-6 relative border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-7xl font-light text-off-white mb-6">Packages</h2>
          <p className="font-sans text-lg text-zinc-500 max-w-md mx-auto">
            Curated experiences for every scale of celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PackageCard 
            title="The Essence" 
            price="$350" 
            features={[
              "One Signature Fragrance",
              "Up to 4 Diffuser Units",
              "Delivery & Setup",
              "4 Hours of Coverage"
            ]} 
          />
          <PackageCard 
            title="The Signature" 
            price="$550" 
            isPopular 
            features={[
              "Two Signature Fragrances",
              "Up to 8 Diffuser Units",
              "Scent Zoning (Reception vs Ceremony)",
              "Full Event Coverage",
              "On-site Technician"
            ]} 
          />
          <PackageCard 
            title="Bespoke" 
            price="Custom" 
            features={[
              "Custom Scent Design",
              "Unlimited Coverage",
              "Branded Scent Favors",
              "Multi-day Events",
              "Destination Weddings"
            ]} 
          />
        </div>
      </div>
    </section>
  );
};

export default Packages;
