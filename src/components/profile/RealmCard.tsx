import { useContext, useState } from "react"

import { AppContext } from "@/providers/AppContextProvider";
import { ImageFromRealmAtomicalId } from "./ImageFromRealmAtomicalId";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import { ImageFromData } from "@/components/common/ImageFromData";

export const RealmCard = ({atomicalId, subrealmName, imageData}: {atomicalId?: string, subrealmName?: string, imageData: string}) => {

  return atomicalId?.startsWith('fake-skeleton') ? (
    <Skeleton className="h-[277px] w-full rounded-xl" />
  ) : (
    <Card className={`flex flex-col items-center`}>
      <CardHeader>
        <ImageFromData imageData={imageData}  />
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle>{subrealmName}</CardTitle>
          {/* <CardDescription>#{atomicalNumber}</CardDescription> */}
          <Button>
            <a href={`/profile/${subrealmName}`} target="_blank">See more</a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}