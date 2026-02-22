import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  title: string
  description: string
  showLogo?: boolean
}

export const AuthCard = ({ title, description, children, showLogo = false }: Props) => {
  return (
    <Card className='w-sm'>
      <CardHeader>
        <CardTitle className='text-center'>
          {showLogo && <img className='w-32 h-32 mx-auto' src='/images/logo.svg' alt='Scheduly Logo' />}
          <h1 className='text-4xl font-semibold text-foreground'>{title}</h1>
        </CardTitle>

        <CardDescription>
          <p className='text-xl font-thin text-center text-muted-foreground'>{description}</p>
        </CardDescription>
      </CardHeader>

      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}
