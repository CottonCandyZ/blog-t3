import "~/styles/globals.scss";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "我的",
  description: "我的小屋",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeNumber = Math.floor(Math.random() * 8) + 1;
  // const themeNumber = 1;
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} theme-${themeNumber}`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
