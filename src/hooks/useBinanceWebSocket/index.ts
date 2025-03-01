import { useCallback, useEffect, useMemo, useRef } from 'react';

import { getDefaultStore } from 'jotai';

import { AssetDetail } from '@/types/asset';
import { assetFamily, Market } from '@/atoms/asset';

import { BinanceTicker } from './types';

const useBinanceWebSocket = () => {
  const websocketRef = useRef<WebSocket>(null);

  const connect = useCallback((codes: string[]) => {
    const store = getDefaultStore();

    const socket = new WebSocket('wss://stream.binance.com:9443/ws');
    websocketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: codes.map((code) => `${code}@ticker`),
          id: 1,
        }),
      );
    };

    socket.onmessage = async (e) => {
      const data: BinanceTicker = JSON.parse(e.data);

      if (data.e !== '24hrTicker') {
        return;
      }

      const code = data.s.split('USDT')[0];

      const serializedData: AssetDetail = {
        ask_bid: 'ASK',
        change_price: Number(data.c) - Number(data.o),
        high_price: Number(data.h),
        low_price: Number(data.l),
        name: code,
        symbol: code,
        opening_price: Number(data.o),
        prev_closing_price: Number(data.c),
        trade_price: Number(data.c),
        trade_volume: Number(data.Q),
        currency_code: 'USD',
      };

      store.set(assetFamily(code), {
        market: Market.Binance,
        asset: serializedData,
      });
    };

    socket.onclose = () => {};
  }, []);

  useEffect(() => {
    const current = websocketRef.current;

    return () => {
      if (!current) {
        return;
      }

      current.close();
    };
  }, []);

  return useMemo(
    () => ({
      connect,
    }),
    [connect],
  );
};

export default useBinanceWebSocket;
