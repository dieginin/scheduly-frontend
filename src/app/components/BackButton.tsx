import { Button } from "@/shared/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router"

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button
      variant='link'
      className='border-background fixed top-4 right-4 overflow-hidden rounded-sm border p-0.5 backdrop-blur-sm'
      onClick={() => navigate("/")}
    >
      <ChevronLeft className='-mr-1' />
      Go back
    </Button>
  )
}
