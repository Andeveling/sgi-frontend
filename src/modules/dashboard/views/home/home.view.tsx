import { useTitleView } from "@/hooks/useTitleView"

export default function Home() {
  useTitleView({ layoutDisplayName: "Dashboard", viewDisplayName: "Home" })
  return (
    <div>Home</div>
  )
}