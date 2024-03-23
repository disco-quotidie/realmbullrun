import axios from "axios"

export default async function getSubrealmsFromBackend(network: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/get-subrealms`)
  return response.data
}