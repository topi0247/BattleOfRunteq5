"use client";

import * as CardList from "@/components/showcase";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

export default function Showcase() {
  return (
    <Suspense fallback={<div>Now Loading...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

enum Tab {
  all = "",
  mini = "ミニアプリ",
  pf = "ポートフォリオ",
}

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) || "";
  const API_URL = process.env.NEXT_PUBLIC_GAS_URL || "";
  const { data } = useSWR(API_URL, fetcher);
  const [showData, setShowData] = useState<Data[] | null>(null);
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [miniData, setMiniData] = useState<Data[] | null>(null);
  const [pfData, setPfData] = useState<Data[] | null>(null);
  const [tabName, setTabName] = useState<string | null>(null);

  useEffect(() => {
    if (!data || data === undefined) return;

    const resultData = data.map((item: Data) => {
      const url = new URL(item.appImage);
      const id = url.searchParams.get("id");
      const imageURL = `https://lh3.googleusercontent.com/d/${id}`;
      return {
        ...item,
        appImage: imageURL,
      };
    });

    setAllData(resultData);

    // ミニアプリ
    const miniApps = resultData.filter(
      (item: Data) => item.appType === "ミニアプリ"
    );
    setMiniData(miniApps);

    // PF
    const pfApps = resultData.filter(
      (item: Data) => item.appType === "ポートフォリオ"
    );
    setPfData(pfApps);
  }, [data]);

  useEffect(() => {
    if (!allData || !miniData || !pfData) return;

    switch (tab as string) {
      case "":
        setShowData(allData);
        setTabName("ALL");
        break;
      case "mini":
        setShowData(miniData);
        setTabName("Mini App");
        break;
      case "pf":
        setShowData(pfData);
        setTabName("Portfolio");
        break;
      default:
        setShowData(allData);
        setTabName("ALL");
        break;
    }
  }, [tab, allData, miniData, pfData]);

  if (!data || data === undefined) {
    return <div>Now Loading...</div>;
  }

  return (
    <div className="w-full bg-transparent">
      <h1 className="w-full text-center text-3xl mb-4">- {tabName} -</h1>
      <article className="mx-4 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8">
        {showData &&
          showData.map((item: Data) => (
            <CardList.Card
              key={item.id}
              title={item.appName}
              description={item.appShortDescription}
              creator={item.creator}
              link={item.appUrl}
              image={item.appImage}
              slug={item.id}
            />
          ))}
      </article>
    </div>
  );
}
