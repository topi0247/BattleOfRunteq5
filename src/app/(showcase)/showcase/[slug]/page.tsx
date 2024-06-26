"use client";

import { BackButton, Meteors } from "@/components/ui";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface Data {
  id: string;
  appType: string;
  appName: string;
  appImage: string;
  appUrl: string;
  appShortDescription: string;
  appDescription: string;
  creator: string;
  creatorX: string;
  repositoryURL: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AppPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const API_URL = process.env.NEXT_PUBLIC_GAS_URL || "";
  const { data } = useSWR(API_URL, fetcher);
  const [showData, setShowData] = useState<Data | null>(null);

  useEffect(() => {
    if (!data) return;
    let resultData = data.find((item: Data) => item.id == slug);
    if (!resultData) {
      throw new Error("Not found");
    }
    const url = new URL(resultData.appImage);
    const id = url.searchParams.get("id");
    const imageURL = `https://lh3.googleusercontent.com/d/${id}`;
    resultData.appImage = imageURL;

    if (resultData.creatorX.includes("@")) {
      const id = resultData.creatorX.replace("@", "");
      const xURL = `https://x.com/${id}`;
      resultData.creatorX = xURL;
    }

    setShowData(resultData);
  }, [data]);

  if (!showData) {
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
                  src={showData.appImage}
                  className="w-full object-cover aspect-video"
                />
              </div>
              <h1 className="font-bold text-xl text-white mb-4 relative z-50 text-center">
                {showData.appName}
              </h1>
              <p className="text-center">{showData.appShortDescription}</p>
              <p className="text-center">{showData.creator}</p>
              <p className="font-normal text-base mb-4 relative my-4 whitespace-pre-wrap">
                {showData.appDescription}
              </p>

              <div className="flex justify-center items-center gap-4">
                {showData.repositoryURL && (
                  <a
                    href={showData.repositoryURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                  >
                    リポジトリ
                  </a>
                )}
                <a
                  href={showData.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                >
                  サービス
                </a>
                {showData.creatorX && (
                  <a
                    href={showData.creatorX}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300"
                  >
                    X
                  </a>
                )}
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
