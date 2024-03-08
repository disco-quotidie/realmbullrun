import { useContext, useEffect, useState } from "react"

import { AppContext } from "@/providers/AppContextProvider";
import { ImageFromRealmAtomicalId } from "./ImageFromRealmAtomicalId";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "./DynamicIcon";
import Link from "next/link";

export const RealmCard = ({ atomicalId, links, subrealmName, imageData }: { atomicalId?: string, links?: any, subrealmName?: string, imageData: string }) => {

  return atomicalId?.startsWith('fake-skeleton') ? (
    <Skeleton className="h-[277px] w-full rounded-xl" />
  ) : (
    <Card className={`flex flex-col items-center w-44 mx-auto`}>
      <CardHeader className="pb-0" >
        <ImageFromData imageData={imageData} />
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle>
            <a href={`/profile/${subrealmName}`} target="_blank">{subrealmName}</a>
          </CardTitle>
          {/* <CardDescription>#{atomicalNumber}</CardDescription> */}
        </div>

      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="w-full flex justify-around ">
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
      </CardFooter>


    </Card>
  )
}