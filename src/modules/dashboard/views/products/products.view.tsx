import { useTitleView } from "@/hooks/useTitleView"

export default function ProductsPage() {
  useTitleView({ layoutDisplayName: "Dashboard", viewDisplayName: "Products" })
  return (
    <div>ProductsPage</div>
  )
}