import { useTitleView } from "@/hooks/useTitleView"

export default function StorePage() {
  useTitleView({ layoutDisplayName: "Dashboard", viewDisplayName: "Store" })

  return (
    <div>
      <pre>{JSON.stringify({ store: "view" }, null, 2)}</pre>
    </div>
  )
}
