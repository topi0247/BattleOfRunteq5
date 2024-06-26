"use client";
import { SparklesCore } from "@/components/ui";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  const { data } = useSWR(process.env.NEXT_PUBLIC_GAS_URL || "", fetcher);
  return (
    <main className="bg-black w-full min-h-screen flex justify-center items-center">
      <div className="h-[40rem] bg-black flex flex-col items-center justify-center overflow-hidden rounded-md container">
        <h1 className="md:text-7xl text-5xl lg:text-9xl font-bold text-center text-white relative z-20 flex flex-col justify-center items-center">
          BATTRUN
          <br />
          SHOWCASE
        </h1>
        <div className="w-full h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 w0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px " />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px]  blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          <div className="absolute z-50 text-white top-2 w-full text-center flex flex-col justify-center items-center gap-5">
            <p className="text-md md:text-4xl">バトランへの挑戦</p>
            <Link
              href="/showcase"
              className="inline-block px-4 py-2 rounded-full border border-white btnshine"
            >
              アプリを見る
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
