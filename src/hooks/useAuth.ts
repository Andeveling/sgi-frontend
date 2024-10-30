import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectCurrentJWT } from "@/modules/auth/slices"

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)
  const jwt = useSelector(selectCurrentJWT)

  return useMemo(() => ({ user, jwt }), [user, jwt])
}
