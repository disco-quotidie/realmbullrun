import ClickToChoosePFP from "./ClickToChoosePFP"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import ImageFromDataClickable from "../common/ImageFromDataClickable"
import NameEdit from "./NameEdit"
import DescriptionEdit from "./DescriptionEdit"
import LinksEdit from "./LinksEdit"
import DonatesEdit from "./DonatesEdit"
import { useState } from "react"

export default function Profile ({
  data
}: {
  data: any,
  // getUpdatedAndProceed
}) {

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [realmList, setRealmList] = useState<any>([])
  const [subrealmList, setSubrealmList] = useState<any>([])
  const [pfpNftList, setPfpNftList] = useState<any>([])
  const [profileNftList, setProfileNftList] = useState<any>([])
  const [currentRealm, setCurrentRealm] = useState<any>(null)

  const [selectedPFPId, setSelectedPFPId] = useState<string>("")
  const [selectedPFPData, setSelectedPFPData] = useState<any>()
  const [isPFPSheetOpen, setIsPFPSheetOpen] = useState(false)
  const [profileName, setProfileName] = useState("Click to edit your name")
  const [profileDescription, setProfileDescription] = useState("Click to write your bio or description.")
  const [links, setLinks] = useState<any>([])
  const [donates, setDonates] = useState<any>([])

  const openUpdateDialog = () => {
    setIsUpdateDialogOpen(true)
  }

  const onCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false)
  }

  return (
    <div className="text-center justify-center lg:w-6/12 lg:mx-auto mx-8">
      <ClickToChoosePFP atomicalId={selectedPFPId} data={selectedPFPData} onClick={() => setIsPFPSheetOpen(true)} />
      <Sheet open={isPFPSheetOpen} onOpenChange={() => setIsPFPSheetOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Choose one of your NFT as your avatar.</SheetTitle>
            <SheetDescription>
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="flex flex-col gap-4">
                  {
                    pfpNftList.map((elem: any) => (
                      <ImageFromDataClickable 
                        onClick={(data: any) => {
                          setSelectedPFPId(elem.atomical_id)
                          setSelectedPFPData(data)
                          setIsPFPSheetOpen(false)
                        }} 
                        data={elem} 
                        key={elem.atomical_id} 
                      />
                    ))
                  }
                </div>
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col gap-4 mt-6">
        <NameEdit value={profileName} onEdit={(data: any) => setProfileName(data || "Click to edit your name")} />
        <DescriptionEdit value={profileDescription} onEdit={(data: any) => setProfileDescription(data || "Click to write your bio or description.")} />
        <LinksEdit value={links} onEdit={(data: any) => setLinks(data)} />
        <DonatesEdit value={donates} onEdit={(data: any) => setDonates(data)} />
      </div>
    </div>
  )
}