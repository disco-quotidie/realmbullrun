import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import VIPCard from "./VIPCard"
import { useEffect } from "react"
import Autoplay from "embla-carousel-autoplay"

export default function VIPCaurosel ({ data }: { data: any[] }) {

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
            data.map((vipItem: any, index: any) => (
              <CarouselItem className="lg:basis-1/5 md:basis-1/4 sm:basis-1/2 basis-full" key={index}>
                <VIPCard data={vipItem} />
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