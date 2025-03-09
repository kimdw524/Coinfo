import Image from 'next/image';

interface AssetLogoProps {
  symbol: string;
  width: number;
  height: number;
}

const AssetLogo = ({ symbol, width, height }: AssetLogoProps) => {
  return <Image src={`https://static.upbit.com/logos/${symbol}.png`} alt={symbol} width={width} height={height} />;
};

export default AssetLogo;
