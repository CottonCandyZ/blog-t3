import "~/styles/globals.scss";
import "~/styles/markdown.scss";
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "~/components/footer";
import MobileNav from "~/components/mobile-nav";
import RootProvider from "~/components/root-provider";
import HeaderWithWrapper from "~/components/header-with-wapper";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <RootProvider>
        <TRPCReactProvider headers={headers()}>
          <HeaderWithWrapper />
          <MobileNav />
          {children}
          <Footer />
        </TRPCReactProvider>
      </RootProvider>
    </html>
  );
}
