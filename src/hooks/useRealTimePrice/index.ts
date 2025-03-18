import { useEffect } from 'react';

import useBinanceWebSocket from '@/hooks/useBinanceWebSocket';
import useBithumbWebSocket from '@/hooks/useBithumbWebSocket';
import useUpbitWebSocket from '@/hooks/useUpbitWebSocket';

const useRealTimePrice = (symbol: string[]) => {
  const upbitWebSocket = useUpbitWebSocket();
  const bithumbWebSocket = useBithumbWebSocket();
  const binanceWebSocket = useBinanceWebSocket();

  useEffect(() => {
    upbitWebSocket.connect();
    bithumbWebSocket.connect();
    binanceWebSocket.connect();

    upbitWebSocket.event.onopen = () => {
      upbitWebSocket.subscribe(symbol);
    };

    bithumbWebSocket.event.onopen = () => {
      bithumbWebSocket.subscribe(symbol);
    };

    binanceWebSocket.event.onopen = () => {
      binanceWebSocket.subscribe(symbol);
    };

    return () => {
      upbitWebSocket.close();
      bithumbWebSocket.close();
      binanceWebSocket.close();
    };
  }, [upbitWebSocket, bithumbWebSocket, binanceWebSocket, symbol]);
};

export default useRealTimePrice;
