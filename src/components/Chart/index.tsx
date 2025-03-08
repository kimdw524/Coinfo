'use client';

import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';

import { RadioButton, RadioButtonItem } from '@/components/ui/radio-button';
import useUpbitCandle from '@/hooks/useUpbitCandle';
import { TimeFrame } from '@/types/chart';

import { chartOptions } from './options';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartProps {
  symbol: string;
}

const Chart = ({ symbol }: ChartProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1d');
  const candles = useUpbitCandle({ symbol, timeFrame });

  const series = useMemo(() => {
    const data = candles.map((candle) => ({
      x: new Date(candle.candle_date_time_kst),
      y: [candle.opening_price, candle.high_price, candle.low_price, candle.trade_price],
    }));

    return [{ data, name: symbol }];
  }, [candles]);

  const handleChange = useCallback((value: string) => {
    setTimeFrame(value as TimeFrame);
  }, []);

  return (
    <div className="p-2">
      <RadioButton defaultValue={timeFrame} onChange={handleChange}>
        <RadioButtonItem value="1d">1일</RadioButtonItem>
        <RadioButtonItem value="1w">1주</RadioButtonItem>
        <RadioButtonItem value="1m">1개월</RadioButtonItem>
        <RadioButtonItem value="6m">6개월</RadioButtonItem>
        <RadioButtonItem value="1y">1년</RadioButtonItem>
        <RadioButtonItem value="all">최대</RadioButtonItem>
      </RadioButton>
      <ApexChart options={chartOptions} series={series} type="area" height="100%" />
    </div>
  );
};

export default Chart;
