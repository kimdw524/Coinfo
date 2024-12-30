import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Board',
  description: 'Board',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
