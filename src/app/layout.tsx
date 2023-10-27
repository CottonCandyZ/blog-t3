import "~/styles/globals.scss";
import { Noto_Sans_SC } from "next/font/google";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const nsc = Noto_Sans_SC({
  subsets: ["cyrillic", "latin"],
});

const themeNumber = Math.floor(Math.random() * 8) + 1;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nsc.className} theme-${themeNumber}`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
