import "~/styles/globals.scss";
// import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const themeNumber = Math.floor(Math.random() * 8) + 1;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans theme-${themeNumber}`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
