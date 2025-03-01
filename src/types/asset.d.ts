export type CurrencyCode = 'USD' | 'KRW';

export interface AssetDetail {
  name: string;
  symbol: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price?: number;
  prev_closing_price: number;
  change_price: number;
  ask_bid: 'ASK' | 'BID';
  trade_volume: number;
  highest_52_week_price?: number;
  highest_52_week_date?: string;
  lowest_52_week_price?: number;
  lowest_52_week_date?: string;
  trade_volume?: number;
  currency_code: CurrencyCode;
}
