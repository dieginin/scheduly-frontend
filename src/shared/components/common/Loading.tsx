import { LoaderCircle } from "lucide-react"

export const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 min-h-svh'>
      <LoaderCircle className='animate-spin w-27.5 h-27.5 text-primary/20' />
      <h1 className='text-4xl font-thin'>Loading...</h1>
    </div>
  )
}
