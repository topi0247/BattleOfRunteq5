"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Headers() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";

  return (
    <header className="w-full fixed bottom-0 z-50 bg-black md:sticky md:bottom-auto md:top-0 bg-opacity-40">
      <nav className="my-4">
        <ul className="flex justify-center items-center text-lg gap-1">
          <li>
            <Link href="/" className="btn-link border-liner">
              <span>Top</span>
            </Link>
          </li>
          <li>
            <Link
              href="/showcase"
              className={`btn-link border-liner ${tab === "" ? "active" : ""}`}
            >
              <span>ALL</span>
            </Link>
          </li>
          <li>
            <Link
              href="/showcase?tab=mini"
              className={`btn-link border-liner ${
                tab === "mini" ? "active" : ""
              }`}
            >
              <span>Mini App</span>
            </Link>
          </li>
          <li>
            <Link
              href="/showcase?tab=pf"
              className={`btn-link border-liner ${
                tab === "pf" ? "active" : ""
              }`}
            >
              <span>Portfolio</span>
            </Link>
          </li>
          <li>
            <Link
              href="/showcase?tab=other"
              className={`btn-link border-liner ${
                tab === "other" ? "active" : ""
              }`}
            >
              <span>other</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
