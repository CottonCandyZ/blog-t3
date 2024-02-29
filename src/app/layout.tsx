import "~/styles/globals.scss";
import "~/styles/markdown.scss";
import { Noto_Sans_SC } from 'next/font/google'
import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "~/components/footer";
import MainWrapper from "~/components/main-wrapper";

const noto_sans_sc = Noto_Sans_SC({
  subsets: ['latin']
});

const themeNumber = Math.floor(Math.random() * 8) + 1;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased theme-${themeNumber} ${noto_sans_sc.className}}`}>
        <TRPCReactProvider headers={headers()}>
          <MainWrapper>
            {children}
            <Footer />
          </MainWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
