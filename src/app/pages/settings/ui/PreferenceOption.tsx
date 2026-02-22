import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  title: string
}

export const PreferenceOption = ({ children, title }: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-sm font-medium'>{title}</h1>
      {children}
    </div>
  )
}
