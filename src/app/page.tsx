'use client';

import { StarIcon } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import AssetWatchList from '@/components/market/AssetWatchList';
import { currencies } from '@/constants/currencies';
import useRealTimePrice from '@/hooks/useRealTimePrice';

export default function Home() {
  useRealTimePrice(currencies.map((currency) => currency.symbol));

  return (
    <>
      <Navbar sticky />
      <h1 className="text-md flex items-center gap-1 px-3 py-2">
        <StarIcon className="text-amber-300" fill="currentColor" size={30} />
        <span>관심 종목</span>
      </h1>
      <AssetWatchList />
    </>
  );
}
