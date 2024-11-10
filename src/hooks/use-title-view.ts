import { useEffect } from "react"

export const useTitleView = ({
  layoutDisplayName,
  viewDisplayName,
}: {
  layoutDisplayName: string
  viewDisplayName: string
}) => {
  useEffect(() => {
    document.title = `${layoutDisplayName} | ${viewDisplayName}`
  }, [layoutDisplayName, viewDisplayName])

  return { layoutDisplayName, viewDisplayName }
}
