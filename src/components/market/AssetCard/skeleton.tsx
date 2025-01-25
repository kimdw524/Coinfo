import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

interface AssetCardSkeletonProps {
  children: ReactNode;
  name: string;
  symbol: string;
  isLoading: boolean;
}

const AssetCardSkeleton = ({ children, name, symbol, isLoading }: AssetCardSkeletonProps) => {
  return isLoading ? (
    <>
      <div className="mb-2">
        <p>{name}</p>
        <p className="text-sm text-gray-600">{symbol}</p>
      </div>
      <div className="flex items-end justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-16" />
      </div>
    </>
  ) : (
    children
  );
};

export default AssetCardSkeleton;
