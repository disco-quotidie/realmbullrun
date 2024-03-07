import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/providers/AppContextProvider"

import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

export const ImageFromUri = ({ uri, key, loading, additionalClass = "" }: { uri: string, key?: string, loading?: boolean, additionalClass?: string, isStorage?: boolean }) => {

  const { network } = useContext(AppContext)


  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isSvg, setIsSvg] = useState(false);
  const [imageSrc, setImageSrc] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      if (uri.startsWith("/")) {
        setImageSrc(uri)
        return
      }
      // https://ep.atomicals.xyz/urn/atom:btc:dat:0fff1b002bee7f760e139701f14d1731bdafed2334ba2e7f7604239731611b0di0/SUTD.svg
  
  
      let atomicalId = ""
      if (uri.startsWith("atom:btc:id") || uri.startsWith("atom:btc:dat")) {
        atomicalId = uri.split(":")[3]
        if (atomicalId.indexOf("/") > -1)
          atomicalId = atomicalId.split("/")[0]
      }
      let APIEndpoint = ""
      if (uri.startsWith("atom:btc:id"))
        APIEndpoint = `${(network === 'testnet' ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY)}/blockchain.atomicals.get?params=["${atomicalId}"]`
      else if (uri.startsWith("atom:btc:dat"))
        APIEndpoint = `${(network === 'testnet' ? process.env.NEXT_PUBLIC_CURRENT_URN_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_URN_PROXY)}`
      else {
        setImageSrc(uri)
        return
      }
  
      const response = await fetch(APIEndpoint)
      const apiData = await response.json()
      console.log(apiData)
    }

    fetchData()
    
      // const fetchData = async () => {
    //   if (!imageSrc)
    //     return;
    //   try {
    //     let imageId = imageSrc
    //     if (imageSrc.startsWith("atom:")) {
    //       const splits = imageSrc.split(":")
    //       imageId = splits[splits.length - 1]
    //     }
    //     if (imageId.indexOf("/") > -1)
    //       imageId = imageSrc.split("/")[0]

    //     let value: any, svgFlag = false
    //     if (isStorage) {
    //       if (imageId.endsWith("i0"))
    //         imageId = imageId.substring(0, imageId.length - 2)
    //       const response = await fetch(`${APIEndpoint}/blockchain.transaction.get?params=["${imageId}",0]`);
    //       const apiData = await response.json();
    //       value = apiData.response
    //     }
    //     else {
    //       const response = await fetch(`${APIEndpoint}/blockchain.atomicals.get_state?params=["${imageId}"]`);
    //       const apiData = await response.json();
    
    //       // Function to find the property after "latest" and fetch its "$d" items
    //       const getLatestData = (latestObject: any) => {
    //         let isSvg = false;
          
    //         for (const key in latestObject) {
    //           if (latestObject[key]?.$b) {
    //             if (key.endsWith('.svg')) {
    //               isSvg = true;
    //             }
    //             return { value: latestObject[key].$b, isSvg };
    //           }
    //         }
          
    //         return { value: null, isSvg: false }; // Handle the case when no suitable property is found
    //       };
          
    
    //       // const latestFileData = apiData?.response?.result?.state?.latest && getLatestData(apiData.response.result.state.latest);
    
    //       const { value: latestValue, isSvg: isSvgLatest } = getLatestData(apiData.response.result.state.latest);
    //       value = latestValue
    //       svgFlag = isSvgLatest
    //     }
  
    //     let base64ImageData;

    //     if (typeof value === 'string') {
    //       base64ImageData = Buffer.from(value, 'hex').toString('base64');
    //     } else if (typeof value === 'object' && value.$b) {
    //       base64ImageData = Buffer.from(value.$b, 'hex').toString('base64');
    //     } else {
    //       base64ImageData = ''; // Change this to the default value you want to use
    //     }

    //     setApiResponse({ base64ImageData, isSvg: svgFlag });
    //     setIsSvg(svgFlag); // Update isSvg state

    //     // ... other code
    //   } catch (error) {
    //     console.error(`Error fetching data for: ${imageSrc}`);
    //   } finally {
    //     // setLoading(false);
    //   }
    // }
    // fetchData();
  }, [uri])

  return (
    <div>
      { uri }
      <Image className={`${additionalClass} rounded-lg`} width={144} height={144} src={imageSrc} alt="No Image Found" />
      {

      }
      {/* {
        apiResponse ? (
          isSvg ? (
            <Image className={`${additionalClass} rounded-lg`} width={144} height={144} src={`data:image/svg+xml;base64,${apiResponse.base64ImageData}`} alt="Delegate Image" />
          ) : (
            <Image className={`${additionalClass} rounded-lg`} width={144} height={144} src={`data:image/png;base64,${apiResponse.base64ImageData}`} alt="Delegate Image" />
          )
        ) : (
          <Skeleton className="w-[144px] h-[144px]" />
        )
      } */}
    </div>
  )
}