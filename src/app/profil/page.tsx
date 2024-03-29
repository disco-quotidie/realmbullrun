"use client"
import { AppContext } from "@/providers/AppContextProvider"
import { WalletContext } from "@/providers/WalletContextProvider"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useState } from "react"
import { Atomicals, ElectrumApi, createKeyPair, detectAddressTypeToScripthash } from "../atomical-lib"
import { CommandInterface } from "../atomical-lib/commands/command.interface"
import { getKeypairInfo } from "../atomical-lib/utils/address-keypair-path"
import { SetProfileCommand } from "../atomical-lib/commands/set-profile-command"
import getStateHistoryFromAtomicalId from "@/lib/get-state-history-from-atomical-id";
import getAtomicalIdFromRealmname from "@/lib/get-atomical-id-from-realmname";
import SelectPFP from "@/components/profile/SelectPFP"
import ImageFromDataClickable from "@/components/common/ImageFromDataClickable"
import NameEdit from "@/components/profile/NameEdit"
import DescriptionEdit from "@/components/profile/DescriptionEdit"
import LinksEdit from "@/components/profile/LinksEdit"
import DonatesEdit from "@/components/profile/DonatesEdit"
import ClickToChoosePFP from "@/components/profile/ClickToChoosePFP"
import isProfileNft from "@/lib/is-profile-nft"
import isPfpNft from "@/lib/is-pfp-nft"
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address"
import Profile from "@/components/profile/Profile"

export default function Profiles () {
  const { network, showAlert, showError, tlr, mnemonic } = useContext(AppContext)
  const { walletData } = useContext(WalletContext)

  const [subrealmList, setSubrealmList] = useState<any>([])
  const [currentRealm, setCurrentRealm] = useState<any>(null)
  const [currentProfileId, setCurrentProfileId] = useState()
  const [pfpNftList, setPfpNftList] = useState<any>([])
  const [profileNftList, setProfileNftList] = useState<any>([])
  const [profileSelectPlaceholder, setProfileSelectPlaceholder] = useState("Select your profile NFT")
  const [isPFPSheetOpen, setIsPFPSheetOpen] = useState(false)
  const [isSetDialogOpen, setSetDialogOpen] = useState(false)

  useEffect(() => {

    const getAtomicals = async () => {
      if (walletData.connected) {
        const atomicalsObject = await getAtomicalsFromAddress(walletData.primary_addr, network)
        if (!atomicalsObject)
          return
        const keys = Object.keys(atomicalsObject)
        let atomicals: any[] = []
        keys.map((key: string) => atomicals.push(atomicalsObject[key]))

        let pfps: any[] = [], realms: any[] = [], subrealms: any[] = [], profiles: any[] = []
        atomicals.map((elem: any) => {
          const { type, subtype, confirmed, request_dmitem_status, request_subrealm_status, request_realm_status} = elem
          if (type === "NFT") {
            if (subtype === "realm") {
              if ( request_realm_status.status === "verified") realms.push(elem)
            }
            else if (subtype === "subrealm") {
              if ( request_subrealm_status.status === "verified") subrealms.push(elem)
            }
            else if (subtype === "dmitem") {
              if ( request_dmitem_status.status === "verified") pfps.push(elem)
            }
            else if (!subtype) {    // this is not collection, just solo nft
              if (confirmed || confirmed === "true") {
                if (isProfileNft(elem))
                  profiles.push(elem)
                if (isPfpNft(elem)) {
                  pfps.push(elem)
                }
              }
            }
          }
        })

        setSubrealmList(subrealms)
        if (subrealms.length > 0)
          setCurrentRealm(subrealms[0])

        setPfpNftList(pfps)
        setProfileNftList(profiles)
        if (profiles.length > 0) {
          setCurrentProfileId(profiles[0].atomical_id)
          // setProfileSelectPlaceholder(`${profiles[0].atomical_id.substring(0, 5)}...${profiles[0].atomical_id.substring(profiles[0].atomical_id.length - 5, profiles[0].atomical_id.length)}`)
        }
      }
    }

    getAtomicals()

  }, [walletData, network])

  const dummyData = {
    // "d": "2435aa7c81bacaf06d7ce74f8e44406730a318a1419cce98530ea0eae15a3c93i0"
    "d": "834294414ea77ec09b989f95ced4e45864cd3667b1c25bb282ced02ba00845e6i0"
  }

  const mintDelegate = async () => {
    // if (!selectedPFPId) {
    //   showError("Please select your pfp.")
    //   return
    // }
    // if (!profileName || profileName === "Click to edit your name") {
    //   showError("Please edit your name.")
    //   return
    // }
    // if (!profileDescription || profileDescription === "Click to write your bio or description.") {
    //   showError("Please edit your description.")
    //   return
    // }

    // const profileJson = {
    //   v: "1.1",
    //   name: profileName,
    //   desc: profileDescription,
    //   image: selectedPFPId,
    //   links,
    //   wallets: donates
    // }
    // console.log(profileJson)
  }

  const testInscribe = async () => {  
    const publicKey = await window.wizz.getPublicKey()

    if (!currentRealm) {
      showAlert("Please choose your subrealm and continue.")
      return;
    }
    let { atomical_id: atomicalId }: { atomical_id: string } = currentRealm
    atomicalId = atomicalId.replaceAll("\"", "")

    const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0")
    const { WIF } = funding_address

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY) || ''));
    try {
      await atomicals.electrumApi.open();
      const command: CommandInterface = new SetProfileCommand(atomicals.electrumApi, { satsbyte: 10 }, atomicalId, dummyData, WIF, publicKey);
      const res = await command.run(signPsbts);
    } catch (error: any) {
      console.log(error)
    } finally {
      atomicals.electrumApi.close();
    }
  }

  const signPsbts = async (toSignPsbts: any[]) => {
    for (let i = 0; i < toSignPsbts.length; i++) {
      const psbt = toSignPsbts[i];
      const signedPsbt = await window.wizz.signPsbt(psbt)
      await window.wizz.pushPsbt(signedPsbt)
      return signedPsbt
    }
  }

  if (!walletData.connected) {
    return (
      <div className="my-8 text-center justify-center">
        Connect your wallet to continue...
      </div>
    )
  }

  const getHistory = async () => {
    let { atomical_id }: { atomical_id: string} = currentRealm
    atomical_id = atomical_id.replaceAll("\"", "")
    const res = await getStateHistoryFromAtomicalId(atomical_id, network)
  }

  return (
    <div className="text-center justify-center lg:w-6/12 lg:mx-auto mx-8">
      <div className="my-4 flex flex-col items-center justify-center gap-4">
        <div>Your On-Chain Profiles</div>
        <p>
          Profiles are also NFTs permanently residing on Bitcoin. Once you mint them, you can set them to any of your subrealm to show everyone...
        </p>
        <Select value={!currentProfileId ? "" : currentProfileId} onValueChange={(val: any) => setCurrentProfileId(val.toString())}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={profileSelectPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {
              profileNftList.map((elem: any) => (
                <SelectItem key={elem.atomical_id} value={`\"${elem.atomical_id}\"`}>{elem.atomical_id.substring(0, 5)}...{elem.atomical_id.substring(elem.atomical_id.length - 5, elem.atomical_id.length)}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Button className="lg:w-1/2 w-full lg:mx-auto" onClick={() => {
          setSetDialogOpen(true)
        }}>Set to Realm</Button>
        
      </div>

      {/* <Sheet open={isPFPSheetOpen} onOpenChange={() => setIsPFPSheetOpen(false)}>
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
                          // setSelectedPFPId(elem.atomical_id)
                          // setSelectedPFPData(data)
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
      </Sheet> */}

      <Profile atomical_id={currentProfileId || ""} pfpNftList={pfpNftList} />

      <div className="flex flex-col gap-4 mt-6">
        <Button className="lg:w-1/2 w-full lg:mx-auto" onClick={() => {
          mintDelegate()
        }}>Mint Profile</Button>
        <Button className="lg:w-1/2 w-full lg:mx-auto" onClick={() => {
          testInscribe()
        }}>Publish On-Chain</Button>
        <Button className="lg:w-1/2 w-full lg:mx-auto" onClick={() => {
          getHistory()
        }}>Get History</Button>
      </div>

      <Dialog open={isSetDialogOpen} onOpenChange={() => setSetDialogOpen(false)} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set your profile to your realm</DialogTitle>
            <DialogDescription>
              <Select value={!currentRealm ? "" : currentRealm.atomical_id} onValueChange={(val: any) => setCurrentRealm({atomical_id: val.toString()})}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select your realm" />
                </SelectTrigger>
                <SelectContent>
                  {
                    subrealmList.map((elem: any) => (
                      <SelectItem key={elem.atomical_id} value={`\"${elem.atomical_id}\"`}>{elem.full_realm_name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

