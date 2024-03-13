"use client"
import { Input } from "@/components/ui/input";
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address";
import { AppContext } from "@/providers/AppContextProvider";
import { useContext, useEffect, useState } from "react";

export default function CheckAtomicals() {

  const [address, setAddress] = useState("")
  const { network } = useContext(AppContext)
  
  useEffect(() => {
    const fetchFunc = async () => {
      const result = await getAtomicalsFromAddress(address, network)
      console.log(result)
    }
    if (address)
      fetchFunc()
  }, [address])

  return (
    <Input value={address} onChange={e => setAddress(e.target.value)} />
  )
}