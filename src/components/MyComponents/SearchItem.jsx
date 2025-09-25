import * as React from 'react'
import { ChevronsUpDown, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function ComboboxDemo({ onSelect, items }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[400px] justify-between'
        >
          <p className='opacity-50'>Seleccionar producto</p>
          <Search className='ml-auto opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-0'>
        <Command>
          <CommandInput placeholder='Buscar producto' className='h-9' />
          <CommandList>
            <CommandEmpty>no se encontró producto</CommandEmpty>
            <ScrollArea className='max-h-[300px]'>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.masterProductId}
                    value={item.masterProductId}
                    onSelect={() => {
                      onSelect && onSelect(item)
                      setOpen(false)
                    }}
                  >
                    <span class='hidden'>{item.masterProductId} /</span>
                    {item.masterName}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
