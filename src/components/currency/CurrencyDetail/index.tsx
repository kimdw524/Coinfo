'use client';

import dynamic from 'next/dynamic';
import { ReactNode, Suspense, useMemo } from 'react';

import Chart from '@/components/Chart';
import CurrencyHeader from '@/components/currency/CurrencyHeader';
import useRealTimePrice from '@/hooks/useRealTimePrice';

interface CurrencyDetailProps {
  children: ReactNode;
  symbol: string;
  name: string;
}

const CurrencyDetail = ({ children, symbol, name }: CurrencyDetailProps) => {
  useRealTimePrice(useMemo(() => [symbol], [symbol]));

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <CurrencyHeader symbol={symbol} name={name} />
      </Suspense>
      {children}
      <Chart symbol={symbol} />
    </>
  );
};

export default dynamic(() => Promise.resolve(CurrencyDetail), { ssr: false });
