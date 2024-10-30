import { useTitleView } from "@/hooks/useTitleView"

export default function StorePage() {
  useTitleView({ layoutDisplayName: "Dashboard", viewDisplayName: "Store" })
  return (
    <div>StorePage</div>
  )
}