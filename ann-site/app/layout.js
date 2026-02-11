import { Noto_Serif_SC, Press_Start_2P, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "给 Ann",
  description: "给你的",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={`${notoSerifSC.variable} ${pressStart2P.variable} ${notoSansSC.variable}`}>{children}</body>
    </html>
  );
}
