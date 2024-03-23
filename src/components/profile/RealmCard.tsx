import { useContext } from "react"

import { AppContext } from "@/providers/AppContextProvider";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "./DynamicIcon";
import Link from "next/link";

export const RealmCard = ({ atomicalId, links, subrealmName, imageData }: { atomicalId?: string, links?: any, subrealmName?: string, imageData: string }) => {

  const { tlr } = useContext(AppContext)

  return atomicalId?.startsWith('fake-skeleton') ? (
    <Skeleton className="h-[176px] w-full " />
  ) : (
    <Card className={`flex flex-col items-center w-full max-w-44 mx-auto hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`}>
      <CardHeader className="pb-0" >
        <ImageFromData imageData={imageData} />
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle>
            <a href={`/profil/${subrealmName}`} target="_blank">{subrealmName}</a>
          </CardTitle>
          {/* <CardDescription>#{atomicalNumber}</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter className="w-full flex justify-around ">
        {
          (links && (links.x || links.twitter)) ? (
            <Link className="hover:scale-95" href={links.x || links.twitter} target="_blank">
              <DynamicIcon type="x" url={links.x || links.twitter} />
            </Link>
          ) : (
            <></>
          )
        }
        <Link className="hover:scale-95" href={`/profil/${tlr}.${subrealmName}`} target="_blank">
          <DynamicIcon type="person" />
        </Link>
      </CardFooter>


    </Card>
  )
}