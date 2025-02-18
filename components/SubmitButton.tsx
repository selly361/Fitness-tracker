'use client'

import { Button } from '@/components/ui/button'
import { type ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
  loading?: boolean
}

export default function SubmitButton({
  children,
  pendingText = 'Submitting...',
  className,
  loading,
  ...props
}: Props) {
  const { pending } = useFormStatus()

  const isPending = !!loading ? loading : pending

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      className={cn(className, isPending ? 'hover:bg-grey-900' : '')}
      {...props}
    >
      {isPending || pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
