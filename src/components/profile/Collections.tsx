"use client"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ImageFromData } from "../common/ImageFromData"

export const Collections = ({collectionsObject}: {collectionsObject: any}) => {

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
    <div className="flex flex-col gap-8 mb-20">
      {
        (collections && collections.length > 0) ? (
          <div>Collections</div>
        ) : (<></>)
      }
      {
        collections && collections.map((elem: any) => {
          const { name, image, desc, previews } = elem
          console.log(previews)
          return (
            <div className="flex flex-col gap-1" key={`${name.toString()}${desc.toString()}`}>
              <div className="flex flex-row items-center justify-between">
                <ImageFromData additionalClass="" imageData={image}  />
                <div className="flex flex-col mx-auto">
                  <div>{name.toString()}</div>
                  <div className="max-w-[240px]">{desc.toString()}</div>
                </div>
              </div>
              <div className="flex flex-row space-x-2 text-center justify-center">
                {
                  previews.map((preview: any, index: any) => (
                    <ImageFromData additionalClass="" key={index} imageData={preview.toString()} />
                  ))
                }
              </div>
              <Button><Link target="_blank" href={`https://wizz.cash/dmint/${name.toLowerCase()}`}>Show on Wizz</Link></Button>
            </div>  
          )
        })
      }
    </div>
  )
}