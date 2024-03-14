import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import VIPDummyCard from "./VIPDummyCard"

export default function VIPCaurosel ({ data }: { data: any[] }) {

  const dummyData = [
    {
      subrealm: "atomicalsxyz",
      image: "/partners/atomicalsxyz.png"
    },
    {
      subrealm: "wizz",
      image: "/partners/wizz.png"
    },
    {
      subrealm: "atomicalmarket",
      image: "/partners/atomicalmarket.png"
    },
    {
      subrealm: "satsx",
      image: "/partners/satsx.png"
    },
    {
      subrealm: "bitatom",
      image: "/partners/bitatom.png"
    },
    {
      subrealm: "toothy",
      image: "/partners/toothy.png"
    },
  ]

  return (
    <div className="mx-16 mt-4">
      <Carousel 
        plugins={[
          Autoplay({
            delay: 3000
          })
        ]}
        className="w-full max-w-2xl mx-auto"
      >
        <CarouselContent>
          {
            // data.map((vipItem: any, index: any) => (
            dummyData.map((dummyItem: any, index: any) => (
              <CarouselItem className="lg:basis-1/5 md:basis-1/3 sm:basis-1/3 basis-full" key={index}>
                {/* <VIPCard data={vipItem} /> */}
                <VIPDummyCard data={dummyItem} />
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}