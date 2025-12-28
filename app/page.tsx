"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/wrapped");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#1DB954" />

      <div className="relative z-10">
        <Hero currentYear={currentYear} isLoading={status === "loading"} />
        <FeatureCards />
        <Footer currentYear={currentYear} />
      </div>
    </div>
  );
}
