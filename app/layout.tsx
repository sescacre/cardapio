import type { Metadata } from "next";
import "@/app/global-css/reset.css";
import "@/app/global-css/typography.css";
import "@/app/global-css/colors.css";
import "@/app/global-css/layout.css";
import "@/app/layout.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Cardápio Digital • Sesc Acre",
  description: "",
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={plusJakartaSans.className}>
      <body>{children}</body>
    </html>
  );
}
