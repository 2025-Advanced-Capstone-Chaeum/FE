import type { Metadata } from 'next'
import NavigationBar from '@/components/ui/NavigationBar';

export const metadata: Metadata = {
  title: '채움',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <NavigationBar />
      </body>
    </html>
  );
}