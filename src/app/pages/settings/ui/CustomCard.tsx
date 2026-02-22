import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import type { ForwardRefExoticComponent, PropsWithChildren } from "react"

import { Button } from "@/shared/components/ui/button"
import type { LucideProps } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface Props extends PropsWithChildren {
  buttonLabel?: string
  className?: string
  description?: string
  disabled?: boolean
  icon: ForwardRefExoticComponent<LucideProps>
  title: string

  onBtnClick?: () => Promise<void>
}

export const CustomCard = ({ buttonLabel, className, children, description, disabled, icon: Icon, title, onBtnClick }: Props) => {
  return (
    <Card className={cn("rounded-md justify-center", className)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Icon className='w-5 h-5' />
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className='grid gap-2'>{children}</CardContent>

      {buttonLabel && (
        <CardFooter>
          <Button className='w-full' onClick={onBtnClick} size='sm' disabled={disabled}>
            {buttonLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
