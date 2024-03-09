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
import getProfileDataFromBackend from "@/lib/get-profile-data-from-backend";
import { ImageFromData } from "@/components/common/ImageFromData";

const NOT_FOUND = "not-found"
const LOADING = "loading"
const FOUND = "found"

const Profile = ({ params }: { params: { subrealmname: string } }) => {

  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [imageData, setImageData] = useState("")
  const [linksObject, setLinksObject] = useState({})
  const [walletsObject, setWalletsObject] = useState({})
  const [collectionsObject, setCollectionsObject] = useState({})

  const { subrealmname } = params
  const [status, setStatus] = useState(LOADING)
  const { network, tlr, showError, showAlert } = useContext(AppContext)  

  useEffect(() => {
    const fetchData = async () => {
      setStatus(LOADING)
      const profileData = await getProfileDataFromBackend(`${subrealmname}`, network)
      if (!profileData || !profileData.success || profileData.success === "false") {
        setStatus(NOT_FOUND)
      }
      else if (profileData.success) {
        const { name, desc, image, links, subrealm, collections, atomical_id } = profileData.data
        if (name)
          setProfileName(name)
        if (desc)
          setDescription(desc)
        if (image)
          setImageData(image)
        if (links)
          setLinksObject
        if (collections)
          setCollectionsObject(collections)
        setStatus(FOUND)
      }
    }
    fetchData()
  }, [network])

  if (status === NOT_FOUND) {
    return (
      <div className="lg:w-6/12 lg:mx-auto mt-8 mx-8 flex flex-col items-center justify-around gap-4 text-center">
        not found
      </div>
    )
  }
  return (
    <div className="lg:w-6/12 lg:mx-auto mt-8 mx-8 flex flex-col items-center justify-around gap-4 text-center">
      <div className="text-2xl">
        {`+${subrealmname}`}
      </div>
      {
        status === LOADING ? (
          <Skeleton className="h-[144px] w-[144px]" />
        ) : (
          <ImageFromData imageData={imageData}  />
        )
      }
      {
        status === LOADING ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <div className="text-2xl">{profileName}</div>
        )
      }
      {
        status === LOADING ? (
          <Skeleton className="h-8 w-96" />
        ) : (
          <div>{description}</div>
        )
      }
      <Links linksObject={linksObject} />
      <Donates donates={walletsObject} />
      <Collections collectionsObject={collectionsObject} />
    </div>
  )
}

export default Profile