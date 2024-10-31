import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoginForm from "./login-form"

describe("LoginForm", () => {
  it("should render the login form", () => {
    render(<LoginForm />)

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Github" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Google" })).toBeInTheDocument()
  })
})
