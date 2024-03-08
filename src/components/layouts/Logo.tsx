
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width = 40, height = 40 }: { width?: number; height?: number }) => {
  return (
    <Link href="/">
      <Image className="min-w-[40px] min-h-[40px]" width={width} height={height} src={`/plus.png`} alt="" />
    </Link>
  );
};
