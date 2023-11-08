import "~/styles/globals.scss";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";

const themeNumber = Math.floor(Math.random() * 8) + 1;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased theme-${themeNumber}`}>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
