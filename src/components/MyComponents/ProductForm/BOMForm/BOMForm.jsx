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
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { useMemo } from 'react'

export default function BOMForm({ submit, defaultValues }) {

  // Local state
  const axiosPrivate = useAxiosPrivate()
  const [selectedProducts, setSelectedProducts] = useState([])

  // Hooks
  const { data: products, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/v1/inventory/items')
      return response.data.content
    }
  })
  const form = useForm()

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    submit({ ...data, id: defaultValues?.id, selectedProducts })

  }

  const columns = useMemo(() => [
    {
      header: 'Product',
      accessorKey: 'itemName',
      enableSorting: false,
      size: '100%',
    },
    {
      header: 'Cantidad',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        return (
          <FormField
            control={form.control}
            name={`quantities.${original.itemId}`}
            render={({ field }) => (
              <FormItem className='w-full'>
                      
                <FormControl>
                  <Input
                    id={field.name}
                    {...field}
                    disabled={isSubmitting}
                    min={1}
                    defaultValue={1}
                    className='w-16 m-2 h-7'
                    type='number'
                  />
                </FormControl>
                      
                <FormMessage />
              </FormItem>
            )}
          />
        )
      }
    }
  ], [])

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
        <div className='w-full flex flex-col justify-center mt-5'>
          {/* {
            (products && !isLoading && !isFetching) &&
            <SearchItem items={products} idKey='itemId' nameKey='itemName' onSelect={(item) => setSelectedProducts([...selectedProducts, item])} />
          } */}
          
          <Input type='text' placeholder='Buscar Producto' />

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem>

                <FormControl>
                  <Select
                    // onValueChange={field.onChange}
                    defaultValue={field.value}
                    onValueChange={(value) => {
                      field.onChange(value)
                      const product = products.find(p => p.itemId === value)
                      if (product && !selectedProducts.find(p => p.itemId === product.itemId)) {
                        setSelectedProducts([...selectedProducts, product])
                      }
                    }}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Productos' />
                    </SelectTrigger>

                    <SelectContent>
                      {
                        !isFetching && !isLoading &&
                        products?.map((product) => (
                          <SelectItem key={product.itemId} value={product.itemId}>{product.itemName}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          
        </div>

        {
          selectedProducts?.length > 0 &&
          <BigTable
            columns={columns}
            data={selectedProducts}
            hoverRow
            // enableLazyLoad={!isRefetching && hasNextPage}
            // loadingLazyLoad={hasNextPage && isFetchingNextPage}
            // handleLazyLoad={fetchNextPage}
          />
        }
    
        <Button type='submit' className='font-bold w-fit self-end' disabled={isSubmitting}>
          Agregar
        </Button>
      </form>
    </Form>
  )
}

