import { PrimitiveAtom, useAtom } from 'jotai';

import { MarketAtom } from '@/atoms/asset';
import { cn } from '@/lib/utils';

import { changeVariants } from './style';

interface AssetDetailProps {
  name: string;
  marketAtom: PrimitiveAtom<MarketAtom>;
}

const AssetDetail = ({ name, marketAtom }: AssetDetailProps) => {
  const [market] = useAtom(marketAtom);
  // TODO: 새로운 객체를 생성하지 않고 최적의 거래소를 선택하는 방법 고안하기
  const [asset] = useAtom(Object.values(market)[0]);

  const price = asset?.trade_price || 0;
  const change = asset?.change_price || 0;
  const changeType = change > 0 ? 'rise' : change < 0 ? 'fall' : 'same';

  return (
    <>
      <div className="mb-2">
        <p>{name}</p>
        <p className="text-sm text-gray-600">{asset.symbol}</p>
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
            {Math.round((change / (price - change)) * 10000) / 100}%
          </span>
        </div>
      </div>
    </>
  );
};

export default AssetDetail;
