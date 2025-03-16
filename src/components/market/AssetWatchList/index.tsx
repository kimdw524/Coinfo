import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import AssetCard from '@/components/market/AssetCard';
import { currencies } from '@/constants/currencies';
import AssetCardSkeleton from '../AssetCard/skeleton';

const AssetWatchList = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-2 p-2">
      {currencies.map((currency) => (
        <Suspense key={currency.symbol} fallback={<AssetCardSkeleton name={currency.name} symbol={currency.symbol} />}>
          <AssetCard key={currency.symbol} name={currency.name} symbol={currency.symbol} />
        </Suspense>
      ))}
    </div>
  );
};

export default dynamic(() => Promise.resolve(AssetWatchList), {
  ssr: false,
});
