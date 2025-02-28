'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog'

interface ModalDialogProps {
  triggerLabel: string
  title: string
  description?: string
  triggerButtonProps?: React.ComponentProps<typeof Button>
  className?: string
  children: React.ReactNode
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export default function ModalDialog({
  triggerLabel,
  title,
  description,
  triggerButtonProps,
  className,
  children,
  isOpen,
  onOpen,
  onClose,
}: ModalDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onOpen?.() : onClose?.())}
    >
      <DialogTrigger asChild>
        <Button className='bg-[#842C7E] hover:bg-[#842C6E]' {...triggerButtonProps} onClick={onOpen}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className={className ?? 'w-11/12' + ' h-'}>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl text-grey-900'>{title}</DialogTitle>
          {description && (
            <DialogDescription className='text-sm text-grey-500 mb-4'>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
