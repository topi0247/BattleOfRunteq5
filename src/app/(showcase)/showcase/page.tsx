"use client";

import * as CardList from "@/components/showcase";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Showcase() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  return (
    <Suspense fallback={<div>Now Loading...</div>}>
      <div className="w-full bg-transparent">
        <h1 className="w-full text-center text-3xl mb-4">- ALL -</h1>
        <article className="mx-4 grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8">
          {tab === "" && <CardList.ALlCardList />}
          {tab === "mini" && <CardList.MiniCardList />}
          {tab === "pf" && <CardList.PortfolioCardList />}
          {tab === "other" && <CardList.OtherCardList />}
        </article>
      </div>
    </Suspense>
  );
}
