import { useCallback, useEffect, useMemo, useRef } from 'react';

import { getDefaultStore } from 'jotai';

import { assetFamily } from '@/atoms/assetFamily';

import type { UpbitTicker } from './types';

const useUpbitWebSocket = () => {
  const websocketRef = useRef<WebSocket>(null);

  const connect = useCallback((codes: string[]) => {
    const store = getDefaultStore();

    const socket = new WebSocket('wss://api.upbit.com/websocket/v1');
    websocketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify([
          {
            ticket: crypto.randomUUID(),
          },
          {
            type: 'ticker',
            codes,
          },
          {
            format: 'DEFAULT',
          },
        ]),
      );
    };

    socket.onmessage = async (e) => {
      const data: UpbitTicker = JSON.parse(await e.data.text());
      const atom = assetFamily(data.code);

      store.set(atom, {
        ask_bid: data.ask_bid,
        change_price: data.signed_change_price,
        high_price: data.high_price,
        highest_52_week_date: data.highest_52_week_date,
        highest_52_week_price: data.highest_52_week_price,
        low_price: data.low_price,
        lowest_52_week_date: data.lowest_52_week_date,
        lowest_52_week_price: data.lowest_52_week_price,
        name: data.code,
        symbol: data.code,
        opening_price: data.opening_price,
        prev_closing_price: data.prev_closing_price,
        trade_price: data.trade_price,
        trade_volume: data.trade_volume,
        currency_code: 'KRW',
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

export default useUpbitWebSocket;
