import { useTitleView } from "@/hooks/useTitleView"
import LoginForm from "../../components/login/form/login-form"

export default function Login() {
  useTitleView({ layoutDisplayName: "Auth", viewDisplayName: "Login" })
  return <LoginForm />
}
