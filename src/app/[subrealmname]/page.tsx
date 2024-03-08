"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContextProvider";

import { ImageFromUri } from "@/components/profile/ImageFromUri";
import { Donates } from "@/components/profile/Donates";
import { Links } from "@/components/profile/Links";
import { Collections } from "@/components/profile/Collections"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import getProfileDataFromBackend from "@/lib/get-profile-data-from-backend";

const NOT_FOUND = "not-found"
const LOADING = "loading"
const FOUND = "found"

const Profile = ({ params }: { params: { subrealmname: string } }) => {

  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const [linksObject, setLinksObject] = useState({})
  const [walletsObject, setWalletsObject] = useState({})
  const [collectionsObject, setCollectionsObject] = useState({})

  const { subrealmname } = params
  const [status, setStatus] = useState(LOADING)
  const { network, tlr, showError, showAlert } = useContext(AppContext)
  const APIEndpoint = network === 'testnet' ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY

  

  useEffect(() => {
    const fetchData = async () => {
      // const atomicalId = await getAtomicalIdFromRealmname(`${tlr}.${subrealmname}`)
      const profileData = await getProfileDataFromBackend(`${subrealmname}`, network)
      if (!profileData) {
        setStatus(NOT_FOUND)
      }
      else {
      }
    }
    fetchData()
  }, [network])

  if (status === NOT_FOUND) {
    return (
      <div>
        not found
      </div>
    )
  }
  return (
    <div className="lg:w-6/12 lg:mx-auto mt-8 mx-8 flex flex-col items-center justify-around gap-4 text-center">
      <div className="text-2xl">
        {`+${subrealmname}`}
      </div>
      {/* <ImageFromUri imageSrc={imageSrc} dataLoading={status === LOADING} /> */}
      {
        status === LOADING ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <div className="text-2xl">{profileName}</div>
        )
      }
      {
        status === LOADING ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <div>{description}</div>
        )
      }
      <Separator />
      <Links linksObject={linksObject} />
      <Separator />
      <Donates donates={walletsObject} />
      <Separator />
      <Collections collectionsObject={collectionsObject} />
    </div>
  )
}

export default Profile