import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { ThemeProvider } from "./providers/theme-provider"
import { router } from "./router/router"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <ThemeProvider defaultTheme='dark' storageKey='sgi-project'>
        <RouterProvider router={router} />
      </ThemeProvider>
   
  </StrictMode>
)
