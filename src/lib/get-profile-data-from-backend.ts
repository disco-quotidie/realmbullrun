import axios from "axios"

export default async function getProfileDataFromBackend (subrealm: string, network: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/get-subrealm-info?subrealm=${subrealm}`)
  return response.data
}