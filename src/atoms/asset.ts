'use client';

import { atom, PrimitiveAtom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { AssetDetail } from '@/types/asset';

export type MarketAtom = Partial<Record<Market, PrimitiveAtom<AssetDetail>>>;

export interface AssetAtom {
  [key: string]: PrimitiveAtom<MarketAtom>;
}
export enum Market {
  Upbit,
  Binance,
}
export const assetAtom = atom({} as AssetAtom);

export const marketFamily = atomFamily(() => atom());

export const assetFamily = atomFamily((code: string) =>
  atom(
    (get) => get(assetAtom)[code],
    (get, set, args: { market: Market; asset: AssetDetail }) => {
      const prev = get(assetAtom);

      if (!prev[code]) {
        const marketAtom: MarketAtom = { [args.market]: atom(args.asset) };
        return set(assetAtom, { ...prev, [code]: atom(marketAtom) });
      }

      const marketAtom = get(prev[code]);

      if (!marketAtom[args.market]) {
        return set(prev[code], { [args.market]: atom(args.asset) });
      }

      set(marketAtom[args.market]!, args.asset);
    },
  ),
);
