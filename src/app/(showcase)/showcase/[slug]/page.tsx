"use client";

import { BackButton, Meteors } from "@/components/ui";
import { useEffect, useState } from "react";

interface Data {
  appName: string;
  appDescription: string;
  detailDescription: string;
  creator: string;
  image: string;
  repositoryURL: string;
  appUrl: string;
}

export default function AppPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/data/${slug}.json`);
          if (res.ok) {
            const result = await res.json();
            setData(result);
          } else {
            console.error("File not found");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [slug]);

  if (!data) {
    return <div>Now Loading...</div>;
  }

  return (
    <article className="container flex justify-center items-center px-8">
      <div className="z-10">
        <div className="w-full relative">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800  p-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
            <Meteors number={20} />
            <div className="z-10 text-white w-full">
              <div className="w-full my-4">
                <img
                  src={data.image}
                  className="w-full object-cover aspect-video"
                />
              </div>
              <h1 className="font-bold text-xl text-white mb-4 relative z-50 text-center">
                {data.appName}
              </h1>
              <p className="text-center">{data.appDescription}</p>
              <p className="text-center">{data.creator}</p>
              <p className="font-normal text-base mb-4 relative my-4 whitespace-pre-wrap">
                {data.detailDescription}
              </p>

              <div className="flex justify-center items-center gap-4">
                {data.repositoryURL && (
                  <a
                    href={data.repositoryURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                  >
                    リポジトリ
                  </a>
                )}
                <a
                  href={data.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                >
                  サービス
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-8">
          <BackButton />
        </div>
      </div>
    </article>
  );
}
