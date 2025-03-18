import { Suspense } from 'react';

import CurrencyDetail from '@/components/currency/CurrencyDetail';
import MarketData from '@/components/currency/MarketData';
import { currencies } from '@/constants/currencies';

interface CurrenciesPageProps {
  params: Promise<{ symbol: string }>;
}

export default async function CurrenciesPage({ params }: CurrenciesPageProps) {
  const symbol = (await params).symbol;
  const name = currencies.find((currency) => currency.symbol === symbol)!.name;

  return (
    <section>
      <Suspense fallback={<div>loading...</div>}>
        <CurrencyDetail symbol={symbol} name={name}>
          <MarketData name={name} />
        </CurrencyDetail>
      </Suspense>
    </section>
  );
}
