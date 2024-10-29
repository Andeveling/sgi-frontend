import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store/types"

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
