export interface BithumbTicker {
  type: string;
  content: {
    buyVolume: number;
    chgAmt: number;
    chgRate: number;
    closePrice: number;
    date: string;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    prevClosePrice: number;
    sellVolume: number;
    symbol: string;
    tickType: string;
    time: string;
    value: number;
    volume: number;
    volumePower: number;
  };
}
