"use client";

import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";

const InquiryForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    // Replace these with your actual EmailJS credentials
    // serviceID, templateID, userID
    emailjs.sendForm(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      formRef.current,
      "YOUR_USER_ID"
    )
    .then(() => {
      setStatus("success");
      formRef.current?.reset();
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      setStatus("error");
    });
  };

  return (
    <section className="bg-black py-40 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-7xl mb-6 text-off-white italic">
            Start the Transformation
          </h2>
          <p className="font-sans text-lg text-zinc-400 tracking-wide">
            Tell us about your event. We'll handle the atmosphere.
          </p>
        </div>

        <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label htmlFor="user_name" className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Name</label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                required
                placeholder="Your Name"
                className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors text-off-white font-light"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="user_email" className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Email</label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                required
                placeholder="your@email.com"
                className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors text-off-white font-light"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <label htmlFor="event_type" className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Event Type</label>
              <input
                type="text"
                name="event_type"
                id="event_type"
                placeholder="Wedding, Corporate, etc."
                className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors text-off-white font-light"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="event_date" className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Event Date</label>
              <input
                type="text"
                name="event_date"
                id="event_date"
                placeholder="MM / DD / YY"
                className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors text-off-white font-light"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows={4}
              placeholder="Tell us about the feeling you want to create..."
              className="bg-transparent border-b border-white/20 py-4 focus:border-white outline-none transition-colors text-off-white font-light resize-none"
            ></textarea>
          </div>

          <div className="flex flex-col items-center pt-8">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`px-12 py-4 rounded-full border border-white/30 font-mono text-xs uppercase tracking-[0.3em] transition-all duration-500 ${
                status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-black"
              }`}
            >
              {status === "sending" ? "Sending..." : "Send Inquiry"}
            </button>

            {status === "success" && (
              <p className="mt-4 text-green-500 font-mono text-xs uppercase tracking-widest animate-fade-in">
                Inquiry sent successfully. We will be in touch soon.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-500 font-mono text-xs uppercase tracking-widest animate-fade-in">
                Something went wrong. Please try again or call us.
              </p>
            )}
          </div>
        </form>

        <div className="mt-24 text-center border-t border-white/5 pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-600 mb-4">Or reach out directly</p>
            <a href="tel:+1234567890" className="font-serif text-3xl hover:text-zinc-400 transition-colors tracking-tight">
                Call the Architect
            </a>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
