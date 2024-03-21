"use client"
import { useContext, useEffect, useState } from "react";

import { AppContext } from "@/providers/AppContextProvider";

import { Input } from "@/components/ui/input";
import { RealmCard } from "@/components/profile/RealmCard";
import getSubrealmsFromBackend from "@/lib/get-subrealms-from-backend";
import VIPCaurosel from "@/components/common/VIPCarousel";

export default function Explore() {

  const fakeSkeletons: any[] = []
  for (let i = 0; i < 30; i++) {
    fakeSkeletons.push({
      atomical_id: `fake-skeleton-${i}`
    })
  }

  const { network, tlr } = useContext(AppContext)
  const [searchStr, setSearchStr] = useState('')
  const [items, setItems] = useState<any>(fakeSkeletons)
  const [vipItems, setVIPItems] = useState<any>(fakeSkeletons)
  const [pageState, setPageState] = useState('loading')

  useEffect(() => {
    const firstFetch = async () => {
      setPageState('loading')
      const subrealms = await getSubrealmsFromBackend(network)
      // separate VIP...
      let vipSubrealms: any[] = [], collectionSubrealms: any[] = []
      if (subrealms) {
        subrealms.map((elem: any) => {
          const { subrealm }: { subrealm: string } = elem
          // if (isCollectionSubrealm(subrealm)) {
            collectionSubrealms.push(elem)
          // }
          // else {
          //   vipSubrealms.push(elem)
          // }
        })
      }
      setVIPItems(vipSubrealms)
      setItems(collectionSubrealms)
      setPageState('ready')
    }
    firstFetch()
  }, [network])

  const isCollectionSubrealm = (subrealm: string) => {
    if (!subrealm)
      return false
    if (!parseInt(subrealm))
      return false
    const num = parseInt(subrealm)
    // this is to check if subrealm is sth like '123aaa'
    const num_str = new String(num).toString()
    if (num_str === subrealm && num < 10000 && num > 0)
      return true
    return false
  }

  return (
    <div>
      <VIPCaurosel data={vipItems} />
      <div className="mt-4 mx-4 lg:mx-auto text-center space-x-2 lg:w-8/12">
        <Input
          color="default"
          placeholder={`Search +${tlr} subrealms here...`}
          disabled={pageState === 'loading'}
          value={searchStr}
          onChange={e => setSearchStr(e.target.value)}
        />
        {
          items.length === 0 ? (
            <div className="mx-auto mt-16">No Subrealms Found...</div>
          ) : (<></>)
        }
      </div>
      <div className="mx-4 mt-4 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4">
        {
          items && items.filter((elem: any) => (elem.atomical_id.startsWith("fake-skeleton") || elem.subrealm.indexOf(searchStr) > -1)).map((elem: any) => (
            <RealmCard key={elem.atomical_id} links={elem.links} imageData={elem.image} subrealmName={elem.subrealm} atomicalId={elem.atomical_id} />
          ))
        }
      </div>
    </div>
  )
}