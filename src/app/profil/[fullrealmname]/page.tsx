"use client"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/providers/AppContextProvider";

import { Donates } from "@/components/profile/Donates";
import { Links } from "@/components/profile/Links";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import getProfileDataFromBackend from "@/lib/get-profile-data-from-backend";
import { ImageFromData } from "@/components/common/ImageFromData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collections } from "@/components/profile/Collections";
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address";
import getRealmOwnerAddress from "@/lib/get-realm-owner-address";

const NOT_FOUND = "not-found"
const LOADING = "loading"
const FOUND = "found"

const Profile = ({ params }: { params: { fullrealmname: string } }) => {

  const [profileName, setProfileName] = useState("")
  const [description, setDescription] = useState("")
  const [imageData, setImageData] = useState("")
  const [linksObject, setLinksObject] = useState({})
  const [walletsObject, setWalletsObject] = useState({})
  const [collectionsObject, setCollectionsObject] = useState({})
  const [profileOwnerAtomicals, setProfileOwnerAtomicals] = useState<any>([])

  const { fullrealmname } = params
  const [status, setStatus] = useState(LOADING)
  const { network, tlr, showError, showAlert } = useContext(AppContext)

  const subrealmname = fullrealmname.startsWith(`${tlr}.`) ? fullrealmname.substring(tlr.length + 1, fullrealmname.length) : fullrealmname

  useEffect(() => {
    const fetchData = async () => {
      setStatus(LOADING)
      const profileData = await getProfileDataFromBackend(`${subrealmname}`, network)
      if (!profileData || !profileData.success || profileData.success === "false") {
        setStatus(NOT_FOUND)
      }
      else if (profileData.success) {
        const { name, desc, image, links, wallets, subrealm, collections, atomical_id } = profileData.data
        if (name)
          setProfileName(name)
        if (desc)
          setDescription(desc)
        if (image)
          setImageData(image)
        if (links)
          setLinksObject(links)
        if (wallets)
          setWalletsObject(wallets)
        if (collections)
          setCollectionsObject(collections)
        setStatus(FOUND)
      }

      const ownerAddress = await getRealmOwnerAddress(fullrealmname, network)
      if (ownerAddress) {
        const atomicals = await getAtomicalsFromAddress(ownerAddress, network)
        if (atomicals) {
          let atomicalsArray: any[] = []
          const atomicalIds = Object.keys(atomicals)
          atomicalIds.map((id: string) => atomicalsArray.push(atomicals[id]))
          console.log(atomicalsArray)
          setProfileOwnerAtomicals(atomicalsArray)
        }
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
    <>
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {`+${fullrealmname}`}
            </h2>
            <div className="flex items-center space-x-2">
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Profile</TabsTrigger>
              <TabsTrigger value="analytics">
                Bitwork Lab
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Subrealms
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 border-2 p-4 bg-[rgba(117,141,179,0.31)]">
              <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
                <CardContent className="lg:col-span-1 flex justify-center p-0">
                  {
                    status === LOADING ? (
                      <Skeleton className="h-[144px] w-[144px]" />
                    ) : (
                      <ImageFromData imageData={imageData} />
                    )
                  }
                </CardContent>
                <Card className="md:col-span-3 flex flex-col justify-between hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle >
                      {
                        status === LOADING ? (
                          <Skeleton className="h-8 w-32" />
                        ) : (
                          <div className="text-4xl font-large">{profileName}</div>
                        )
                      }
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    {
                      status === LOADING ? (
                        <Skeleton className="h-8 w-96" />
                      ) : (
                        <div>{description}</div>
                      )
                    }
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="flex flex-col justify-between hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Socials
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <Links linksObject={linksObject} />
                  </CardContent>
                </Card>
                <Card className="flex flex-col justify-between hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex flex-col">
                      <CardTitle className="text-sm font-medium">Wallets</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        select an address to send cryptos
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <Donates subrealm={subrealmname} donates={walletsObject} />
                  </CardContent>
                </Card>
              </div>
              {
                (collectionsObject && Object.keys(collectionsObject).length > 0) ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    <Card className="col-span-1 hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]">
                      <CardHeader>
                        <CardTitle>Containers</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {`${Object.keys(collectionsObject).length} ${Object.keys(collectionsObject).length === 1 ? 'collection' : 'collections'} to discover`}
                        </p>
                      </CardHeader>
                      <CardContent className="">
                        <Collections collectionsObject={collectionsObject} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1 hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]">
                      <CardHeader>
                        <CardTitle>Score</CardTitle>
                        <CardDescription>
                          You made 265 points this month.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        test
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <>
                  </>
                )
              }
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4 border-2 p-4 bg-[rgba(117,141,179,0.31)]">
              {
                profileOwnerAtomicals.map((elem: any) => (
                  <div key={elem.atomical_id} className="mb-20 break-words">
                    <div>
                      type: {elem.type}
                    </div>
                    <div>
                      subtype: {elem.subtype}
                    </div>
                    <div>
                      bitworkc: {elem.data?.$bitwork?.bitworkc}
                    </div>
                  </div>
                ))
              }
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>

  )
}

export default Profile