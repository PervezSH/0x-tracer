import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@styles/scss/global.scss';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
