import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import BigTable from '@/components/MyComponents/BigTable'
import { Trash, Pencil, TriangleAlert, Search } from 'lucide-react'
import CharacteristicForm from '@/components/MyComponents/ProductForm/CharacteristicForm/CharacteristicForm'
import BOMForm from '@/components/MyComponents/ProductForm/BOMForm/BOMForm'
import SearchItem from '@/components/MyComponents/SearchItem'
import { useQueries } from '@tanstack/react-query'
import useProductQueries from './useProductQueries'

export default function ProductForm() {

  // Local states
  const [masterProductSelected, setMasterProductSelected] = useState(null)
  const [characteristics, setCharacteristics] = useState([
    {
      characteristic: {
        name: 'Nombre de característica',
        description: ''
      },
      BOM: {
        id: 1,
        name: 'Nombre de BOM',
        description: '',
        isActive: false,
        Products: [],
      },
    },
    {
      characteristic: {
        name: 'Nombre de característica',
        description: ''
      },
      BOM: {},
    }
  ])

  // Hooks
  const navigate = useNavigate()
  const form = useForm({
    // resolver: (() => zodResolver(clientSchema(type)))(),
    // defaultValues
  })
  const { getMasterProducts, getUnits } = useProductQueries()
  const queries = useQueries({
    queries: [
      { queryKey: ['masterProducts', 1], queryFn: getMasterProducts },
      { queryKey: ['units', 2], queryFn: getUnits },
      // { queryKey: ['categories', 3], queryFn: fetchPost },
    ],
  })

  const masterProducts = queries[0]?.data?.data?.content || []
  const units = queries[1]?.data?.data || []
  const { formState: { isSubmitting } } = form

  //Methods
  const onSubmit = async (data) => {
    // Handle form submission
    console.log(masterProductSelected)
    console.log(characteristics)
    console.log(data)
  }

  const columns = [
    {
      header: 'Activo',
      enableSorting: false,
      size: 80,
      cell: ({ row: { original } }) => (
        <Switch
          checked={original.BOM.isActive}
          onCheckedChange={(checked) => {
            setCharacteristics((prev) =>
              prev.map((item) =>
                item.BOM.id === original.BOM.id
                  ? { ...item, BOM: { ...item.BOM, isActive: checked } }
                  : item
              )
            )
          }}
        />
      )
    },
    {
      header: 'Característica',
      accessorKey: 'characteristic.name',
      enableSorting: false,
      size: '40%',
    },
    {
      header: 'Receta',
      accessorKey: 'BOM.name',
      enableSorting: false,
      size: '100%',
      cell: ({ row: { original } }) => {
        if (original.BOM.name) {
          return (
            <div className='flex items-center gap-2'>
              <button className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => console.log(original.id)}>
                <Pencil className='w-4 h-4' />
              </button>
              <span>{original.BOM.name}</span>
            </div>
          )
        }
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline' className='hover:cursor-pointer' size='sm' onClick={() => console.log(original.id)}>
                <TriangleAlert className='stroke-amber-500' /> Asignar receta
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Asignar Receta</DialogTitle>
                <DialogDescription>
                  Completa los campos a continuación para asignar una receta.
                </DialogDescription>
              </DialogHeader>

              <BOMForm />
            </DialogContent>
          </Dialog>
        )
      }
    },
    {
      header: 'Acciones',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        <>
          <button className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => console.log(original.id)}>
            <Pencil className='w-4 h-4' />
          </button>

          <button onClick={() => console.log(original.id)} title='Eliminar cliente' className='text-red-500/50 hover:text-red-500 duration-300 outline-none hover:cursor-pointer p-1'>
            <Trash className='w-4 h-4' />
          </button>
        </>
      )
    },
  ]

  return (
    <div className='lg:px-5'>
      <section className='mb-5 flex items-center'>
        <div className='w-[400px]'>
          <Label className='mb-2'>Producto maestro</Label>
          {/* <div className='w-full relative flex items-center'>
            <Input type='text' placeholder='Buscar producto maestro' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div> */}
          <SearchItem
            items={masterProducts}
            onSelect={(item) => setMasterProductSelected(item)}
          />
        </div>

        {masterProductSelected && (
          <div className='ml-5 flex flex-col justify-center border rounded-xl p-3 max-w-[400px]'>
            <div className='flex gap-2 '>
              <span>Producto seleccionado:</span>
              <span className='font-bold'>{masterProductSelected.masterName}</span>
            </div>
            <span title={masterProductSelected.description || 'Sin descripción'} className='text-sm overflow-hidden text-ellipsis text-nowrap w-full text-muted-foreground'>{masterProductSelected.description || 'Sin descripción'}</span>
            <span className='text-xs text-muted-foreground mt-3'>ID: {masterProductSelected.masterProductId}</span>
          </div>
        )}
      </section>

      <Separator />

      <section className='my-5'>
        <div className=''>
          <header className='flex justify-between items-center mb-3'>
            <h3 className='text-2xl font-bold'>Producto</h3>
          </header>

          <Form {...form}>
            <form id='product-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
              <div className='grid grid-cols-12 gap-4 mb-5'>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                          Nombre
                        </FormLabel>
                                    
                        <FormControl>
                          <Input
                            id={field.name}
                            type='text'
                            {...field}
                            disabled={isSubmitting}
                            placeholder='Jabón Liquido'
                          />
                        </FormControl>
                                    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='SKU'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                          SKU
                        </FormLabel>
                                    
                        <FormControl>
                          <Input
                            id={field.name}
                            type='text'
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                                    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Categoría especifica</FormLabel>

                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Categoría' />
                            </SelectTrigger>
        
                            <SelectContent>
                              <SelectItem value={'a'}>Jabón</SelectItem>
                              <SelectItem value={'b'}>Rodillo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='unit_measurement'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Unidad de medida</FormLabel>

                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Unidad de medida' />
                            </SelectTrigger>
        
                            <SelectContent>
                              {
                                units.map((unit) => (
                                  <SelectItem key={unit.uomCode} value={unit.uomCode}>{unit.name}</SelectItem>
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

                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='item_type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Tipo de item</FormLabel>

                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Unidad de medida' />
                            </SelectTrigger>
        
                            <SelectContent>
                              <SelectItem value={'BASE'}>Base</SelectItem>
                              <SelectItem value={'MT'}>Materia Prima</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='flex gap-10 col-span-6 mt-4'>
                  <div className='flex gap-2 items-center col-span-2'>
                    <FormField
                      control={form.control}
                      name='isActive'
                      render={({ field }) => (
                        <FormItem>

                          <div className='flex gap-2 items-center col-span-2'>
                            <FormControl>
                              <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Esta Activo</FormLabel>
                          </div>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex gap-2 items-center col-span-2'>
                    <FormField
                      control={form.control}
                      name='isAffordable'
                      render={({ field }) => (
                        <FormItem>

                          <div className='flex gap-2 items-center col-span-2'>
                            <FormControl>
                              <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Es Comprable</FormLabel>
                          </div>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex gap-2 items-center col-span-2'>
                    <FormField
                      control={form.control}
                      name='isSalable'
                      render={({ field }) => (
                        <FormItem>

                          <div className='flex gap-2 items-center col-span-2'>
                            <FormControl>
                              <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Es Vendible</FormLabel>
                          </div>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

              </div>

              <Separator />

              <div>
                <header className='flex justify-between items-center mb-3'>
                  <h3 className='text-2xl font-bold'>Política de inventario</h3>
                </header>

                <div className='grid grid-cols-12 gap-4 mb-5'>
                  
                  <div className='col-span-3'>
                    <FormField
                      control={form.control}
                      name='minStock'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Cantidad Mínima en Stock</FormLabel>

                          <FormControl>
                            <Input id={field.name} type='number' {...field} disabled={isSubmitting} />
                          </FormControl>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='col-span-3'>
                    <FormField
                      control={form.control}
                      name='orderAmount'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Cantidad Mínima para pedir</FormLabel>

                          <FormControl>
                            <Input id={field.name} type='number' {...field} disabled={isSubmitting} />
                          </FormControl>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='col-span-3 mt-7'>
                    <FormField
                      control={form.control}
                      name='sellOutOfStock'
                      render={({ field }) => (
                        <FormItem>

                          <div className='flex gap-2 items-center col-span-2'>
                            <FormControl>
                              <Switch id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Vender sin Stock</FormLabel>
                          </div>
                    
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>

      <Separator />

      <section className='my-5'>
        <header className='flex justify-between items-center mb-2'>
          <h3 className='text-2xl font-bold'>Características</h3>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Agregar característica</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar nueva característica</DialogTitle>
                <DialogDescription>
                  Completa los campos a continuación para agregar una nueva característica.
                </DialogDescription>
              </DialogHeader>

              <CharacteristicForm />
            </DialogContent>
          </Dialog>
        </header>

        <BigTable
          columns={columns}
          data={characteristics}
          hoverRow
          // enableLazyLoad={!isRefetching && hasNextPage}
          // loadingLazyLoad={hasNextPage && isFetchingNextPage}
          // handleLazyLoad={fetchNextPage}
        />
      </section>
    </div>
  )
}
