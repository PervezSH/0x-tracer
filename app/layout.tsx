import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import '@styles/global.scss';
import { Navbar } from '@components';
import { JsonRpcContextProvider } from '@contexts';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '0x-Tracer',
  description: 'The Web3 Portfolio Tracer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        <div className="container px-3 pb-3 overflow-x-hidden overflow-y-visible">
          <JsonRpcContextProvider>{children}</JsonRpcContextProvider>
        </div>
      </body>
    </html>
  );
}
