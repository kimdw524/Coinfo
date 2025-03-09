import AssetLogo from '@/components/currency/AssetLogo';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AssetCardSkeletonProps {
  name: string;
  symbol: string;
}

const AssetCardSkeleton = ({ name, symbol }: AssetCardSkeletonProps) => {
  return (
    <Card className="inline-block w-full cursor-pointer transition-all duration-100 select-none hover:bg-slate-200">
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="mb-1 flex flex-row gap-2">
            <span>
              <AssetLogo symbol={symbol} width={24} height={24} />
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{name}</span>
          </div>
          <p className="text-sm text-gray-600">{symbol}</p>
        </div>
        <div className="flex items-end justify-between">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCardSkeleton;
