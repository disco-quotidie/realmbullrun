import { useContext, useEffect, useState } from "react"

import { AppContext } from "@/providers/AppContextProvider";
import { ImageFromRealmAtomicalId } from "./ImageFromRealmAtomicalId";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "./DynamicIcon";
import Link from "next/link";

export const RealmCard = ({atomicalId, links, subrealmName, imageData}: {atomicalId?: string, links?: any, subrealmName?: string, imageData: string}) => {

  return atomicalId?.startsWith('fake-skeleton') ? (
    <Skeleton className="h-[277px] w-full rounded-xl" />
  ) : (
    <Card className={`flex flex-col items-center`}>
      <CardHeader>
        <ImageFromData imageData={imageData}  />
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle><a href={`/profile/${subrealmName}`} target="_blank">{subrealmName}</a></CardTitle>
          {/* <CardDescription>#{atomicalNumber}</CardDescription> */}
          <div className="flex flex-row space-x-2 justify-between">
            {
              (links && (links.x || links.twitter)) ? (
                <Link href={links.x || links.twitter} target="_blank">
                  <DynamicIcon type="x" url={links.x || links.twitter} />
                </Link>
              ) : (
                <></>
              )
            }
            <Link href={`/profile/${subrealmName}`} target="_blank">
              <DynamicIcon type="person" />
            </Link>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}