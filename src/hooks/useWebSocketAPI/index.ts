import { useCallback, useMemo, useRef } from 'react';

import { useStore } from 'jotai';

import { assetFamily, Market } from '@/atoms/asset';
import type { AssetDetail } from '@/types/asset';

interface WebSocketEvent {
  onopen?: WebSocket['onopen'];
  onclose?: WebSocket['onclose'];
  onerror?: WebSocket['onerror'];
}

interface UseWebSocketAPIProps<U> {
  market: Market;
  url: string;
  formatSubscribe: (tickers: string[]) => string;
  formatUpdate: (data: U) => AssetDetail | undefined | void;
}

const useWebSocketAPI = <U>({ market, url, formatSubscribe, formatUpdate }: UseWebSocketAPIProps<U>) => {
  const store = useStore();

  const webSocketRef = useRef<WebSocket>(null);
  const eventRef = useRef<WebSocketEvent>({});
  const readyState = webSocketRef.current?.readyState || 0;

  const connect = useCallback(() => {
    const socket = new WebSocket(url);
    webSocketRef.current = socket;

    socket.onopen = (e) => {
      if (!eventRef.current.onopen) {
        return;
      }

      eventRef.current.onopen.call(socket, e);
    };

    socket.onclose = (e) => {
      if (!eventRef.current.onclose) {
        return;
      }

      eventRef.current.onclose.call(socket, e);
    };

    socket.onerror = (e) => {
      if (!eventRef.current.onerror) {
        return;
      }

      eventRef.current.onerror.call(socket, e);
    };

    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data instanceof Blob ? await e.data.text() : e.data);
      const result = formatUpdate(data);

      if (!result) {
        return;
      }

      store.set(assetFamily(result.symbol), {
        market,
        asset: result,
      });
    };
  }, [market, url, store, formatUpdate]);

  const subscribe = useCallback(
    (tickers: string[]) => {
      const socket = webSocketRef.current;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return;
      }

      socket.send(formatSubscribe(tickers));
    },
    [formatSubscribe],
  );

  const close = useCallback(() => {
    if (!webSocketRef.current || webSocketRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    webSocketRef.current.close();
  }, []);

  return useMemo(
    () => ({
      readyState,
      event: eventRef.current,
      connect,
      subscribe,
      close,
    }),
    [readyState, connect, subscribe, close],
  );
};

export default useWebSocketAPI;
