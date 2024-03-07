"use client"
import { useEffect, useContext, useState } from "react"

import { AppContext } from "@/providers/AppContextProvider";
import { ImageFromRealmAtomicalId } from "./ImageFromRealmAtomicalId";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import getAtomicalInfoFromId from "@/lib/get-atomical-info-from-id";

export const RealmCard = ({atomicalId, subrealmName, filter}: {atomicalId?: string, subrealmName?: string, filter: string}) => {

  const { network, tlr } = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  const [atomicalNumber, setAtomicalNumber] = useState("----")
  const [status, setStatus] = useState("unknown")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const atomicalData = await getAtomicalInfoFromId(atomicalId, network)
      if (atomicalData) {
        const { atomical_number, $request_subrealm_status } = atomicalData
        setStatus($request_subrealm_status.status)
        setAtomicalNumber(atomical_number)
      }
      setLoading(false)
    }
    if (atomicalId && !atomicalId?.startsWith("fake-skeleton") && atomicalId !== "null" && atomicalId !== "undefined") {
      fetchData()
    }
  }, [network])

  return loading ? (
    <Skeleton className="h-[277px] w-full rounded-xl" />
  ) : (
    <Card style={{display: `${(status === "verified" && subrealmName && subrealmName.indexOf(filter) > -1) ? "block" : "none"}`}} className={`flex flex-col items-center`}>
      <CardHeader>
        {
          status === "verified" ? (
            <ImageFromRealmAtomicalId atomicalId={atomicalId || ""}  />
          ) : (
            <></>
          )
        }
        <div className="flex flex-col items-center justify-around space-y-2">
          <CardTitle>{subrealmName}</CardTitle>
          <CardDescription>#{atomicalNumber}</CardDescription>
          <Button>
            <a href={`/profile/${tlr}.${subrealmName}`} target="_blank">See more</a>
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}