import { JSX } from "react";
import { Card } from ".";
import list from "@/data/list.json";

export default function AllCardList() {
  const allCard: JSX.Element[] = [];

  list.Mini.map((item) => {
    allCard.push(
      <Card
        key={item.slug}
        title={item.appName}
        description={item.appDescription}
        creator={item.creator}
        link={item.url}
        image={item.image}
        slug={item.slug}
      />
    );
  });

  list.Portfolio.map((item) => {
    allCard.push(
      <Card
        key={item.slug}
        title={item.appName}
        description={item.appDescription}
        creator={item.creator}
        link={item.url}
        image={item.image}
        slug={item.slug}
      />
    );
  });

  list.Other.map((item) => {
    allCard.push(
      <Card
        key={item.slug}
        title={item.appName}
        description={item.appDescription}
        creator={item.creator}
        link={item.url}
        image={item.image}
        slug={item.slug}
      />
    );
  });

  return <>{allCard}</>;
}
