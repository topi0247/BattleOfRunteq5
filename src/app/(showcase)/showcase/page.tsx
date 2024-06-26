"use client";

import * as CardList from "@/components/showcase";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Showcase() {
  return (
    <Suspense fallback={<div>Now Loading...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}

interface Data {
  id: string;
  appType: string;
  appName: string;
  appImage: string;
  appUrl: string;
  appShortDescription: string;
  creator: string;
  creatorX: string;
}

enum Tab {
  all = "",
  mini = "ミニアプリ",
  pf = "ポートフォリオ",
}

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) || "";
  const [data, setData] = useState<Data[] | null>(null);
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [miniData, setMiniData] = useState<Data[] | null>(null);
  const [pfData, setPfData] = useState<Data[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tabName, setTabName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = process.env.NEXT_PUBLIC_GAS_URL || "";
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: Data[] = await response.json();
        const resultData = result.map((item: Data) => {
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

        // タブ
        switch (tab as string) {
          case "":
            setData(resultData);
            setTabName("ALL");
            break;
          case "mini":
            setData(miniApps);
            setTabName("Mini App");
            break;
          case "pf":
            setData(pfApps);
            setTabName("Portfolio");
            break;
          default:
            setData(resultData);
            break;
        }
      } catch (error: any) {
        setError(error.message);
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    switch (tab as string) {
      case "":
        setData(allData);
        setTabName("ALL");
        break;
      case "mini":
        setData(miniData);
        setTabName("Mini App");
        break;
      case "pf":
        setData(pfData);
        setTabName("Portfolio");
        break;
      default:
        setData(allData);
        break;
    }
  }, [tab]);

  if (!data) {
    return <div>Now Loading...</div>;
  }

  return (
    <div className="w-full bg-transparent">
      <h1 className="w-full text-center text-3xl mb-4">- {tabName} -</h1>
      <article className="mx-4 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8">
        {data &&
          data.map((item: any) => (
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
