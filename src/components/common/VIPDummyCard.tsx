import { useContext, useEffect } from "react"
import { Skeleton } from "../ui/skeleton"
import { ImageFromData } from "./ImageFromData"
import Link from "next/link"
import { AppContext } from "@/providers/AppContextProvider"
import Image from "next/image"

export default function VIPDummyCard ({data}: {data: any}) {

  const { tlr } = useContext(AppContext)

  return (
    <Link href={`/profile/${data.subrealm}`} target="_blank" title={`+${tlr}.${data.subrealm}`}>
      <Image height={144} width={144} src={`${data.image}`} alt="" />
    </Link>
  )
}