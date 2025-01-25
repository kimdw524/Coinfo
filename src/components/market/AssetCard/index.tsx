'use client';

import { useAtom } from 'jotai';

import { assetFamily } from '@/atoms/assetFamily';
import { Card, CardContent } from '@/components/ui/card';
import withInViewport from '@/hoc/withInViewport';
import { cn } from '@/lib/utils';

import AssetCardSkeleton from './skeleton';
import { changeVariants } from './style';

interface AssetCardProps {
  name: string;
  symbol: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const AssetCard = ({ name, symbol, ref }: AssetCardProps) => {
  const [asset] = useAtom(assetFamily(symbol));

  const price = asset?.trade_price || 0;
  const change = asset?.change_price || 0;
  const changeType = change > 0 ? 'rise' : change < 0 ? 'fall' : 'same';

  return (
    <Card className="inline-block cursor-pointer select-none transition-all duration-100 hover:bg-slate-200" ref={ref}>
      <CardContent className="p-4">
        <AssetCardSkeleton name={name} symbol={symbol} isLoading={!asset}>
          <div className="mb-2">
            <p>{name}</p>
            <p className="text-sm text-gray-600">{symbol}</p>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-semibold">
              {price.toLocaleString()} {asset?.currency_code}
            </span>
            <div className={cn(changeVariants({ changeType }))}>
              <span className="text-xs">
                {change >= 0 && '+'}
                {change.toLocaleString()}
              </span>
              <span>
                {change >= 0 && '+'}
                {Math.round((change / price) * 10000) / 100}%
              </span>
            </div>
          </div>
        </AssetCardSkeleton>
      </CardContent>
    </Card>
  );
};

export default withInViewport(AssetCard);
