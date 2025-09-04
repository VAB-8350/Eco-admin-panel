import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Search } from 'lucide-react'
import BigTable from '@/components/MyComponents/BigTable'
import SearchItem from '@/components/MyComponents/SearchItem'

const products = [
  {
    id: 1,
    name: 'jabon liquido',
  },
  {
    id: 2,
    name: 'champu',
  },
  {
    id: 3,
    name: 'acondicionador',
  },
  {
    id: 4,
    name: 'jabon liquido',
  },
  {
    id: 5,
    name: 'champu',
  },
  {
    id: 6,
    name: 'acondicionador',
  },
  {
    id: 7,
    name: 'jabon liquido',
  },
  {
    id: 8,
    name: 'champu',
  },
  {
    id: 9,
    name: 'acondicionador',
  },
  {
    id: 10,
    name: 'jabon liquido',
  },
  {
    id: 11,
    name: 'champu',
  },
  {
    id: 12,
    name: 'acondicionador',
  },
  {
    id: 13,
    name: 'jabon liquido',
  },
  {
    id: 14,
    name: 'champu',
  }
]


export default function BOMForm({ submit, defaultValues }) {

  // Local state
  const [selectedProducts, setSelectedProducts] = useState([
    {
      product: {
        name: 'Jabon liquido',
        unit: 'LT'
      },
      amount: 1
    },
    {
      product: {
        name: 'Detergente',
        unit: 'LT'
      },
      amount: 2
    }
  ])

  // Hooks
  const form = useForm()

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    submit({ ...data, id: defaultValues?.id })

  }

  const columns = [
    {
      header: 'Product',
      accessorKey: 'product.name',
      enableSorting: false,
      size: '100%',
    },
    {
      header: 'Cantidad',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        return (
          <div className='flex items-center gap-2'>
            <Input type='number' min={1} defaultValue={1} className='w-16 m-2 h-7' />
            <span>{original.product.unit}</span>
          </div>
        )
      }
    }
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'> 

        <div className='flex gap-4  items-center'>
          <FormField
            control={form.control}
            name='recipeCode'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Código de receta</FormLabel>
                      
                <FormControl>
                  <Input id={field.name} type='text' {...field} disabled={isSubmitting} />
                </FormControl>
                      
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Descripción</FormLabel>

              <FormControl>
                <Textarea id={field.name} type='text' {...field} disabled={isSubmitting} />
              </FormControl>
                    
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className='relative flex items-center mt-5'>
          <Input type='text' placeholder='Buscar Producto' className='w-full' />
          <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
        </div> */}
        <div className='w-full flex justify-center mt-5'>
          <SearchItem items={products} onSelect={(item) => console.log(item)} />
        </div>

        <BigTable
          columns={columns}
          data={selectedProducts}
          hoverRow
          // enableLazyLoad={!isRefetching && hasNextPage}
          // loadingLazyLoad={hasNextPage && isFetchingNextPage}
          // handleLazyLoad={fetchNextPage}
        />
    
        <Button type='submit' className='font-bold w-fit self-end' disabled={isSubmitting}>
          Agregar
        </Button>
      </form>
    </Form>
  )
}

