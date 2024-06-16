import { Headers } from "@/components/layouts";
import { SparklesCore } from "@/components/ui";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col">
      <Headers />
      <main className="flex-grow container m-auto max-w-[1000px] mt-8 mb-32 relative">
        {children}
      </main>
      <div className="w-full min-h-screen fixed top-0 left-0 opacity-40">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-screen"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}
