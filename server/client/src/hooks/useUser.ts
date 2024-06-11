import { IUser } from "@/interface/IUser"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode<IUser>(token)
      setUser(decodedToken)
    }
  }, [])

  return { user }
}

export default useUser
