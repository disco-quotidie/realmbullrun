import Image from "next/image"

export const ImageFromData = ({ imageData, key, additionalClass = "" }: { imageData: string, key?: string, additionalClass?: string }) => {

  const toImageSrc = (value: string) => {
    if (!value || typeof value !== "string")
      return "/placeholder-pink.png"
    if (value.startsWith('data:image'))
      return value
    let base64ImageData = Buffer.from(value, 'hex').toString('base64')
    return `data:image/png;base64,${base64ImageData}`
  }

  return (
    <div>
      <Image className={`${additionalClass} rounded-lg`} width={120} height={120} src={toImageSrc(imageData)} alt="No Image Found" />
    </div>
  )
}