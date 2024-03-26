import { useContext } from "react"

import { AppContext } from "@/providers/AppContextProvider";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "./DynamicIcon";
import Link from "next/link";

export const NftPreviewCard = ({ imageData, number }: { imageData: string, number: string }) => {

  const { tlr } = useContext(AppContext)

  return (
    <Card className={`flex flex-col items-center w-full max-w-44 mx-auto hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`}>
      <CardHeader className="pb-0" >
        <ImageFromData imageData={imageData} />
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle>
            {/* <a href={`/profil/${subrealmName}`} target="_blank">{subrealmName}</a> */}
          </CardTitle>
          {/* <CardDescription>#{atomicalNumber}</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="w-full flex justify-around ">

      </CardFooter>
    </Card>
  )
}