import fetchCoinMarketData from '@/api/fetchCoinMarketData';

interface MarketDataProps {
  name: string;
}

const MarketData = async ({ name }: MarketDataProps) => {
  const [data] = await fetchCoinMarketData(name.toLowerCase());

  return (
    <div className="flex flex-col gap-3 p-4 text-sm">
      <div className="flex justify-between">
        <span className="font-semibold">시가총액 (#{data.market_cap_rank})</span>
        <span className="text-muted-foreground">${data.market_cap.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">완전 희석 가치 (FDV)</span>
        <span className="text-muted-foreground">${data.fully_diluted_valuation.toLocaleString()}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold">총 발행한도</span>
        <span className="text-muted-foreground">{data.max_supply?.toLocaleString() || '미제공'}</span>
      </div>
    </div>
  );
};

export default MarketData;
