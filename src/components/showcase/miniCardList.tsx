import { JSX } from "react";
import { Card } from ".";
import list from "@/data/list.json";

export default function MiniCardList() {
  const allCard: JSX.Element[] = [];

  list.mini.map((item) => {
    allCard.push(
      <Card
        key={item.slug}
        title={item.appName}
        description={item.appDescription}
        link={item.url}
        image={item.image}
        slug={item.slug}
      />
    );
  });

  return <>{allCard}</>;
}