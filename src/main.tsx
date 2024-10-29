import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { router } from "./router/router"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./providers/theme-provider"
import { store } from "./store/store"
import { Provider } from "react-redux"

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return
  const { worker } = await import("./mocks/browser")
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider defaultTheme='dark' storageKey='sgi-project'>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  )
})
