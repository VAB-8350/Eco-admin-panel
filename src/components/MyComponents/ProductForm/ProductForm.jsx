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
import InventoryPolicyForm from '@/components/MyComponents/ProductForm/InventoryPolicyForm/InventoryPolicyForm'

export default function ProductForm() {

  // Local states
  const [isActive, setIsActive] = useState(false)
  const [isAffordable, setIsAffordable] = useState(false)
  const [isSalable, setIsSalable] = useState(false)
  const [characteristics, setCharacteristics] = useState([
    {
      characteristic: {
        name: 'Nombre de característica',
        description: ''
      },
      BOM: {
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

  const { formState: { isSubmitting } } = form

  //Methods
  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data)
  }

  const columns = [
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
              <Switch
                checked={original.BOM.isActive}
                onCheckedChange={(checked) => console.log(checked)}
              />
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
      <section className='mb-5 flex justify-center'>
        <div className='w-[400px]'>
          <Label className='mb-2'>Producto maestro</Label>
          <div className='w-full relative flex items-center'>
            <Input type='text' placeholder='Buscar producto maestro' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>
        </div>
      </section>

      <Separator />

      <section className='my-5'>
        <div className=''>
          <header className='flex justify-between items-center mb-5'>
            <h3 className='text-2xl font-bold'>Producto</h3>
          </header>

          <Form {...form}>
            <form id='product-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
              <div className='grid grid-cols-12 gap-4'>

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
                              <SelectItem value={'KG'}>Kilogramos</SelectItem>
                              <SelectItem value={'LT'}>Litros</SelectItem>
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
                    <Switch id='isActive' checked={isActive} onCheckedChange={() => setIsActive(!isActive)} />
                    <Label htmlFor='isActive' className='font-bold text-nowrap'>Esta Activo</Label>
                  </div>

                  <div className='flex gap-2 items-center col-span-2'>
                    <Switch id='isAffordable' checked={isAffordable} onCheckedChange={() => setIsAffordable(!isAffordable)} />
                    <Label htmlFor='isAffordable' className='font-bold text-nowrap'>Es Comprable</Label>
                  </div>

                  <div className='flex gap-2 items-center col-span-2'>
                    <Switch id='isSalable' checked={isSalable} onCheckedChange={() => setIsSalable(!isSalable)} />
                    <Label htmlFor='isSalable' className='font-bold text-nowrap'>Es Vendible</Label>
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
          <h3 className='text-2xl font-bold'>Política de inventario</h3>
        </header>

        {/* <InventoryPolicyForm /> */}

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
