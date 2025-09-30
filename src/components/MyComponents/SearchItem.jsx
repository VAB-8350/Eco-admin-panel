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

export default function ComboboxDemo({ onSelect, items, idKey = 'id', nameKey = 'name' }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} className='z-50'>
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
        <Command className='z-50'>
          <CommandInput placeholder='Buscar producto' className='h-9' />
          <CommandList>
            <CommandEmpty>no se encontró producto</CommandEmpty>
            <ScrollArea className='max-h-[300px]'>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item[idKey]}
                    value={item[idKey]}
                    onSelect={() => {
                      onSelect && onSelect(item)
                      setOpen(false)
                    }}
                  >
                    <span className='hidden'>{item[idKey]} /</span>
                    {item[nameKey]}
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
