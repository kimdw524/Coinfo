import { Market } from '@/atoms/asset';
import useWebSocketAPI from '@/hooks/useWebSocketAPI';

import { BinanceTicker } from './types';

const useBinanceWebSocket = () => {
  const webSocketAPI = useWebSocketAPI<BinanceTicker>({
    market: Market.Binance,
    url: 'wss://stream.binance.com:9443/ws',
    formatSubscribe(tickers) {
      return JSON.stringify({
        method: 'SUBSCRIBE',
        params: tickers.map((ticker) => `${ticker.toLowerCase()}usdt@ticker`),
        id: 1,
      });
    },
    formatUpdate(data) {
      if (data.e !== '24hrTicker') {
        return;
      }

      const code = data.s.split('USDT')[0];

      return {
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
    },
  });

  return webSocketAPI;
};

export default useBinanceWebSocket;
