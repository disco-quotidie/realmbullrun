
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ width = 144, height = 35 }: { width?: number; height?: number }) => {
  return (
    <Link href="/">
      <Image priority className="min-w-[144px] min-h-[35px] transition-all hover:scale-95" width={width} height={height} src={`/bannner.png`} alt="" />
    </Link>
  );
};
