import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import '@styles/scss/global.scss';
import { Navbar } from '@components';

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
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
