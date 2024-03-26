"use client"
import { Button } from "@/components/ui/button"
import { WalletContext } from "@/providers/WalletContextProvider"
import { useCallback, useContext, useEffect, useRef, useState } from "react"

import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address"
import { AppContext } from "@/providers/AppContextProvider"
import getDataByPage from "@/lib/get-data-by-page"
import { RealmCard } from "@/components/profile/RealmCard"
import { NftPreviewCard } from "@/components/profile/NftPreviewCard"

export default function Collection() {

  const { tlr, showError } = useContext(AppContext)
  const [status, setStatus] = useState("loading")
  const [subrealmList, setSubrealmList] = useState<any[]>()
  const divRef = useRef<any>()
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [searchStr, setSearchStr] = useState("")

  const originalMessage = "In order to prove you are the owner of this realm and whitelisted, you should sign this message. No sats are being charged, no transactions are broadcast."
  const { walletData } = useContext(WalletContext)

  useEffect(() => {
    const firstFetch = async () => {
      let subrealms: any[] = []
      const atomicals = await getAtomicalsFromAddress(walletData.primary_addr)
      if (atomicals) {
        const ids = Object.keys(atomicals)
        ids.map((id: string) => {
          const { type, subtype, request_subrealm_status, full_realm_name } = atomicals[id]
          if (
            type === "NFT" 
            && subtype === "subrealm" 
            && request_subrealm_status.status === "verified" 
            && full_realm_name.startsWith(tlr)
            )
            subrealms.push({
              full_realm_name,
              atomicalId: id
            })
        })
        setSubrealmList(subrealms)
      }

      if (!atomicals || subrealms.length < 1)
        setStatus('no-atomicals')
      else 
        setStatus('found')
    }

    const firstPageFetch = async () => {
      setIsLoading(true)
      const initialData = await getDataByPage(0)
      setData(initialData)
      setIsLoading(false)
    }

    firstPageFetch()
    if (walletData.connected) {
      firstFetch()
    }
  }, [walletData.primary_addr])

  useEffect(() => {
    if (!walletData.connected)
      setStatus("no-wallet")
  }, [walletData.connected])

  useEffect(() => {
    console.log(data)
  }, [data])

  const onScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= divRef.current.offsetHeight && ! isLoading) {
      await loadMoreData();
    }
  }, [isLoading, page])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const loadMoreData = async () => {
    setIsLoading(true)
    const moreData = await getDataByPage(page + 1)
    setData((currentData: any[]) => [...currentData, ...moreData])
    setPage(page + 1)
    setIsLoading(false)
  }

  const submit = async (atomicalId: string, full_realm_name: string) => {
    let item = ''
    const splits = full_realm_name.split('.')
    if (splits.length > 1)
      item = splits[1]

    if (!item)
      return

    let signature = ""
    let address = ""
    if (walletData.connected) {
      address = walletData.primary_addr
      if (walletData.type === "wizz" && typeof window !== "undefined" && window.wizz) {
        signature = await window.wizz.signMessage(originalMessage, "bip322-simple")
      }
      if (walletData.type === "okx" && typeof window !== "undefined" && window.okxwallet) {
        signature = await window.okxwallet.bitcoin.signMessage(originalMessage, "bip322-simple")
      }
      if (walletData.type === "unisat" && typeof window !== "undefined" && window.unisat) {
        signature = await window.unisat.signMessage(originalMessage, "bip322-simple")
      }
    }
    signature = signature.replaceAll("+", "%2B")

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/getJSON?item=${item}&address=${address}&signature=\"${signature.toString()}\"`, { method: 'GET' , headers: { 'Content-Type': 'file/unknown'}})
    .then((response: any) => response.blob())
    .then((blob: any) => {
      const { type } = blob
      if (type === "application/json") {
        showError("File Not Found.")
        return;
      }

      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link: any = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${item}.json`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link.parentNode.removeChild(link);
    })

    // if (response.data.success || response.data.success === "false") {
    //   console.log(response.data)
    // }
    // else {
    //   showError(response.data.msg)
    // }
  }

  let whitelistDOM = (
    <>
      <div className="mt-4">
        You are whitelisted !
      </div>
      <div className="mt-4">
        Download the JSON files to mint your artwork.
      </div>
      <div className="mt-4">
        {
          subrealmList?.map((elem: any) => (
            <Button className="text-wrap mb-4 py-2 h-auto" key={elem.atomicalId} onClick={() => submit(elem.atomicalId, elem.full_realm_name)}>+{elem.full_realm_name}</Button>
          ))
        }
      </div>
    </>
  )

  if (status === "loading")
    whitelistDOM = (
      <div className="lg:mx-auto lg:w-6/12 mx-8 text-center">
        locating subrealms...
      </div>
    )

  if (status === "no-wallet") 
    whitelistDOM = (
      <div className="lg:mx-auto lg:w-6/12 mx-8 text-center">
        Please connect your wallet to continue...
      </div>
    )

  if (status === "no-atomicals")
    whitelistDOM = (
      <div className="lg:mx-auto lg:w-6/12 mx-8 text-center">
        No +{tlr} subrealms in this wallet... Mint your subrealm first.
      </div>
    )
  
  return (
    <div 
      // className="lg:mx-auto lg:w-6/12 mx-8 text-center" 
      ref={divRef}>
      
      {whitelistDOM}

      <div className="mx-4 mt-4 grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4">
        {
          data && data.filter((elem: any) => elem.title.indexOf(searchStr) > -1).map((elem: any) => (
            <NftPreviewCard key={elem.id} imageData={elem.image} number={elem.id} />
          ))
        }
      </div>
    </div>
  )
}