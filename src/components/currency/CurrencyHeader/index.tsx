'use client';

import { useAtom } from 'jotai';
import { Share2Icon, StarIcon } from 'lucide-react';

import { assetFamily } from '@/atoms/asset';
import AssetLogo from '@/components/currency/AssetLogo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useAtomAsync from '@/hooks/useAtomAsync';

interface CurrencyHeaderProps {
  symbol: string;
  name: string;
}

const CurrencyHeader = ({ symbol, name }: CurrencyHeaderProps) => {
  const [marketAtom] = useAtomAsync(assetFamily(symbol));
  const [market] = useAtom(marketAtom);
  const [asset] = useAtom(Object.values(market)[0]);

  const price = asset?.trade_price || 0;
  const change = asset?.change_price || 0;
  // const changeType = change > 0 ? 'rise' : change < 0 ? 'fall' : 'same';

  return (
    <div className="@container">
      <div className="flex items-center justify-between p-4">
        <span className="flex h-16 items-center">
          <AssetLogo symbol={symbol} width={48} height={48} />
          <span className="ml-4 text-xl font-semibold">{name}</span>
          <span className="ml-2 text-sm font-medium text-gray-600">{symbol}</span>
          <Separator orientation="vertical" className="mx-4 hidden @2xl:block" />
        </span>
        <span className="grow break-all @max-2xl:hidden">
          <span className="text-2xl font-bold">$ {asset.trade_price?.toLocaleString()}</span>
          <span className="ml-2 whitespace-nowrap text-red-500">
            {change >= 0 && '+'}
            {change.toLocaleString()} ({change >= 0 && '+'}
            {Math.round((change / (price - change)) * 10000) / 100}%)
          </span>
        </span>
        <span className="flex gap-2">
          <Button variant="outline" size="icon">
            <Share2Icon />
          </Button>
          <Button variant="outline" size="icon">
            <StarIcon />
          </Button>
        </span>
      </div>
      <div className="flex items-center px-2 pb-2 @2xl:hidden">
        <span className="text-2xl font-bold">$185,000.00</span>
        <span className="ml-2 text-red-500">+370 (+6.5%)</span>
      </div>
      <Separator orientation="horizontal" className="@2xl:hidden" />
    </div>
  );
};

export default CurrencyHeader;
