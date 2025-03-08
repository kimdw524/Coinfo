import { useEffect, useState } from 'react';

import { TimeFrame } from '@/types/chart';

interface UseUpbitCandleProps {
  symbol: string;
  timeFrame: TimeFrame;
}

interface CandleData {
  market: string;
  candle_date_time_utc: string;
  candle_date_time_kst: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  timestamp: number;
  candle_acc_trade_price: number;
  candle_acc_trade_volume: number;
  unit: number;
}

const API: Record<TimeFrame, string> = {
  '1d': 'https://api.upbit.com/v1/candles/minutes/30?count=48',
  '1w': 'https://api.upbit.com/v1/candles/minutes/240?count=42',
  '1m': 'https://api.upbit.com/v1/candles/days?count=30',
  '6m': 'https://api.upbit.com/v1/candles/weeks?count=26',
  '1y': 'https://api.upbit.com/v1/candles/weeks?count=52',
  all: 'https://api.upbit.com/v1/candles/months?count=200',
};

const useUpbitCandle = ({ symbol, timeFrame }: UseUpbitCandleProps) => {
  const [data, setData] = useState<CandleData[]>([]);

  useEffect(() => {
    (async () => {
      const result = await fetch(`${API[timeFrame]}&market=KRW-${symbol}`, {
        method: 'GET',
      });
      const data: CandleData[] = await result.json();
      setData(data);
    })();
  }, [symbol, timeFrame]);

  return data;
};

export default useUpbitCandle;
