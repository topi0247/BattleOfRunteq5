"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      onClick={() => handleClick()}
      className="rounded-full border border-white btnshine sm"
    >
      戻る
    </button>
  );
}
