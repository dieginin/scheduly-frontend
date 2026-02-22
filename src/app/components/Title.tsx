import type { ForwardRefExoticComponent } from "react"
import type { LucideProps } from "lucide-react"

export const Title = ({ title, icon: Icon }: { title: string; icon: ForwardRefExoticComponent<LucideProps> }) => {
  return (
    <div className='flex items-center gap-2'>
      <Icon className='w-6 h-6 text-primary' />
      <h1 className='text-xl font-semibold'>{title}</h1>
    </div>
  )
}
