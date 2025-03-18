import Link from 'next/link';

import Navbar from '@/components/layout/Navbar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CurrenciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-dvh flex-col">
      <Navbar className="shrink-0" />
      <ResizablePanelGroup direction="horizontal" className="w-full shrink border">
        <ResizablePanel defaultSize={35} minSize={20}>
          <ScrollArea className="w-full bg-amber-200">
            <Link href="/currencies/BTC">BTC</Link>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={65} minSize={40}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
