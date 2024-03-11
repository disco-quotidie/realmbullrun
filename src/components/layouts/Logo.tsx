
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width = 144, height = 60 }: { width?: number; height?: number }) => {
  return (
    <Link href="/">
      <Image priority className="min-w-[144px] min-h-[60px]" width={width} height={height} src={`/banner.png`} alt="" />
    </Link>
  );
};
