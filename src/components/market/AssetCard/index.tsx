'use client';

import Link from 'next/link';

import { withInViewport } from '@kimdw524/react-utils';

import { assetFamily } from '@/atoms/asset';
import AssetDetail from '@/components/market/AssetDetail';
import { Card, CardContent } from '@/components/ui/card';
import useAtomAsync from '@/hooks/useAtomAsync';

interface AssetCardProps {
  name: string;
  symbol: string;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const AssetCard = ({ name, symbol, ref }: AssetCardProps) => {
  const [market] = useAtomAsync(assetFamily(symbol));

  return (
    <Link href={`/currencies/${symbol}`}>
      <Card
        className="inline-block w-full cursor-pointer transition-all duration-100 select-none hover:bg-slate-200"
        ref={ref}
      >
        <CardContent className="p-4">
          <AssetDetail name={name} marketAtom={market} />
        </CardContent>
      </Card>
    </Link>
  );
  // const [assetData] = useAtom(assetAtom['UPBIT']);
};

export default withInViewport(AssetCard);
