import { useCallback, useEffect, useMemo, useRef } from 'react';

import { getDefaultStore } from 'jotai';

import { assetFamily, Market } from '@/atoms/asset';
import { AssetDetail } from '@/types/asset';

import type { BithumbTicker } from './types';

const useBithumbWebSocket = () => {
  const websocketRef = useRef<WebSocket>(null);

  const connect = useCallback((codes: string[]) => {
    const store = getDefaultStore();

    const socket = new WebSocket('wss://pubwss.bithumb.com/pub/ws');
    websocketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'ticker',
          symbols: codes,
          tickTypes: ['24H'],
        }),
      );
    };

    socket.onmessage = async (e) => {
      const origin = JSON.parse(e.data);

      if (origin.type !== 'ticker') {
        return;
      }

      const data: BithumbTicker = origin.content;

      console.log(data);

      const code = data.symbol.split('_')[0];

      const serializedData: AssetDetail = {
        ask_bid: 'BID',
        change_price: Number(data.closePrice) - Number(data.openPrice),
        high_price: Number(data.highPrice),
        low_price: Number(data.lowPrice),
        name: code,
        symbol: code,
        opening_price: Number(data.openPrice),
        prev_closing_price: Number(data.prevClosePrice),
        currency_code: 'KRW',
        trade_price: Number(data.closePrice),
      };

      store.set(assetFamily(code), {
        market: Market.Bithumb,
        asset: serializedData,
      });
    };
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

export default useBithumbWebSocket;
