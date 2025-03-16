'use client';

import dynamic from 'next/dynamic';
import { ReactNode, Suspense } from 'react';

import Chart from '@/components/Chart';
import CurrencyHeader from '@/components/currency/CurrencyHeader';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import useRealTimePrice from '@/hooks/useRealTimePrice';

interface CurrencyDetailProps {
  children: ReactNode;
  symbol: string;
  name: string;
}

const CurrencyDetail = ({ children, symbol, name }: CurrencyDetailProps) => {
  useRealTimePrice(symbol);

  return (
    <>
      <Suspense fallback={<div>ssibal loading...loading...123312</div>}>
        <CurrencyHeader symbol={symbol} name={name} />
      </Suspense>
      <ResizablePanelGroup direction="horizontal" className="border">
        <ResizablePanel className="w-[360px] min-w-[360px]" defaultSize={30}>
          {children}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <Chart symbol={symbol} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default dynamic(() => Promise.resolve(CurrencyDetail), { ssr: false });
