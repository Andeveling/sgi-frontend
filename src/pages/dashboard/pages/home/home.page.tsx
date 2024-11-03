import { useAuthStore } from "@/store/auth/auth.store";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  console.log(user)
  return <div>HomePage</div>
}
