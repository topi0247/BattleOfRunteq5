import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "バトランへの挑戦",
  description: "【非公式】バトラン応募アプリ一覧アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={zenKakuGothicNew.className}>{children}</body>
    </html>
  );
}
