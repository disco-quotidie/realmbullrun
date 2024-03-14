import { useContext, useEffect } from "react"
import { Skeleton } from "../ui/skeleton"
import { ImageFromData } from "./ImageFromData"
import Link from "next/link"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AppContext } from "@/providers/AppContextProvider"

export default function VIPCard ({data}: {data: any}) {

  const { tlr } = useContext(AppContext)

  if (!data || data.atomical_id.startsWith("fake-skeleton"))
    return (
      <Skeleton className="mx-auto h-32 w-32" />
    )

  return (
    <Link href={`/profil/${tlr}.${data.subrealm}`} target="_blank" title={`+${tlr}.${data.subrealm}`}>
      {/* <HoverCard>
        <HoverCardTrigger> */}
          <ImageFromData additionalClass="mx-auto cursor-pointer" imageData={data.image} />          
        {/* </HoverCardTrigger>
        <HoverCardContent>
          {data.subrealm}
        </HoverCardContent>
      </HoverCard> */}
    </Link>
  )
}