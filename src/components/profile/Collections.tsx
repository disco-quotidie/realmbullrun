"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageFromData } from "../common/ImageFromData"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const Collections = ({ collectionsObject }: { collectionsObject: any }) => {

  const [collections, setCollections] = useState<any[]>([])

  useEffect(() => {
    if (collectionsObject) {
      let arr: any = []
      Object.keys(collectionsObject).map((collectionName: any) => {
        const previews = collectionsObject[collectionName]["previews"]
        let collectionItem: any = {
          name: collectionsObject[collectionName]['name'],
          image: collectionsObject[collectionName]['image'],
          desc: collectionsObject[collectionName]['desc'],
        }
        collectionItem['previews'] = previews
        arr.push(collectionItem)
      })
      setCollections(arr)
    }

  }, [collectionsObject])

  return (
    <Carousel orientation="horizontal" plugins={[
      Autoplay({
        delay: 5000,
      }),
    ]}>
      <CarouselContent className="">
        {collections && collections.map((elem: any) => {
          const { name, image, desc, previews } = elem;
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <CarouselItem key={`${name.toString()}${desc.toString()}`} className="flex flex-col items-center justify-center cursor-pointer">
                    <ImageFromData additionalClass="w-[144px]" imageData={image} />
                    <p className="" >{name.toString()}</p>
                    <div className="hidden md:flex p-4 text-muted-foreground">{desc.toString()}</div>
                  </CarouselItem>
                </DialogTrigger>
                <DialogContent className="w-10/12">
                  <DialogHeader>
                    <DialogTitle>{name.toString()}</DialogTitle>
                    <DialogDescription>
                      {desc.toString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {
                      previews.map((preview: any, index: any) => (
                        <ImageFromData additionalClass="w-[72px] lg:w-[144px]" key={index} imageData={preview.toString()} />
                      ))
                    }
                  </div>
                  <DialogFooter>
                    <Button><Link target="_blank" href={`https://wizz.cash/dmint/${name.toLowerCase()}`}>Show on Wizz</Link></Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}