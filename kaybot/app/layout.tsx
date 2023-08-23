import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from '@/core/components/Providers';

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const pjs = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KayBot | Lead Generation Reimagined',
  description: 'KayBot is a chatbot that can be utilized for lead generation in the field of digital marketing.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={pjs.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
