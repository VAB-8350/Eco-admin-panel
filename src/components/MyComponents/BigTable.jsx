// External modules
import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from '@tanstack/react-table'
import { IconCaretUpDown, IconCaretDown, IconCaretUp, IconListDetails } from '@tabler/icons-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/hooks/use-mobile'

// Internal modules
import useIntersectionObserve from '@/hooks/useIntersectionObserve'

// Components

export default function BigTable({
  data,
  columns,
  className,
  isLoading = false,
  addStatusColors = false,
  selectedRows = null,
  setSelectedRows = null,
  hoverRow = false,
  enableLazyLoad = false,
  loadingLazyLoad = false,
  handleLazyLoad = () => {console.log('lazy load')}
}) {

  const [sorting, setSorting] = React.useState([])
  const [selectedRowsLocal, setSelectedRowsLocal] = React.useState({})

  const isMobile = useIsMobile()
  const { observerRef, resetObserver } = useIntersectionObserve({ containerId: 'big-table', handlerIntersection: handleLazyLoad })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { rowSelection: selectedRows ?? selectedRowsLocal, sorting },
    onSortingChange: setSorting,
    onRowSelectionChange: setSelectedRows ?? setSelectedRowsLocal,
    defaultColumn: {
      minSize: 50,
      maxSize: 10000
    }
  })

  React.useEffect(() => {

    resetObserver()

  }, [isLoading, data])

  // skeleton
  if (isLoading) {

    const rows = Array(3).fill(0)
    const columns = Array(isMobile ? 3 : 5).fill(0)

    return (
      <div className='hover:cursor-wite w-full '>
        <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} items-center justify-start gap-3 py-4 px-12`}>
          {columns.map((_, i) => (
            <span key={i} style={{ width: `${Math.floor(Math.random() * (90 - 30 + 1)) + 30}%` }} className='inline-block rounded-[100px] h-3 animate-pulse bg-[var(--primary)]/50' />
          ))}
        </div>
        <div >
          {rows.map((_, i) => (
            <div key={i} className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} items-center justify-start gap-3 py-2 px-12`}>
              {columns.map((_, j) => (
                <span key={j} style={{ width: `${Math.floor(Math.random() * (90 - 30 + 1)) + 30}%` }} className='inline-block rounded-[100px] h-2 animate-pulse bg-[var(--primary)]/20' />
              ))}
            </div>
          ))}
        </div>
      </div>
    )

  }

  return (
    <>
      {
        data?.length > 0 &&
        <ScrollArea
          id='big-table'
          className={`${className} w-full overflow-auto relative`}
        >

          <table className='w-full h-full border-collapse'>

            {/* head */}
            <thead className='sticky top-0 bg-[var(--background)]/50 backdrop-blur-2xl z-10'>
              {
                table.getHeaderGroups().map(group => (
                  // header row
                  <tr key={group.id}>

                    {
                      group.headers.map(header => (
                        // header cell
                        <th
                          className={`
                            text-left text-sm h-full relative p-2
                            ${header.column.columnDef.enableSorting !== false ? 'sortable' : ''}

                          `}
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          style={{
                            maxWidth: header.column.columnDef.maxSize,
                            minWidth: (header.column.columnDef.size !== 50 ? header.column.columnDef.size : header.column.columnDef.minSize),
                            width: (header.column.columnDef.size !== 50 ? header.column.columnDef.size : 'auto')
                          }}
                        >
                          <span className='inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                            {/* sort icons */}
                            {
                              header.column.columnDef.enableSorting !== false &&
                              <>
                                {header.column.getIsSorted() === false && <IconCaretUpDown fill='currentColor' />}
                                {(header.column.getIsSorted() === 'asc') && <IconCaretUp className='up' fill='currentColor' />}
                                {(header.column.getIsSorted() === 'desc') && <IconCaretDown className='down' fill='currentColor' />}
                              </>
                            }

                            {/* head name */}
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                        </th>
                      ))
                    }

                  </tr>
                ))
              }
            </thead>

            {/* body */}
            <tbody>
              {
                table.getRowModel().rows.map(row => (
                  // body row
                  <tr
                    key={row.id}
                    className={`
                      border-b border-[--border] hover:bg-[#f9f9f9] hover:dark:bg-[#181818]
                      ${addStatusColors ? `status-${row.original.status}` : ''}
                      ${hoverRow ? 'hover-row-active' : ''}
                    `}
                  >
                    {
                      row.getVisibleCells().map(cell => (
                        // body cell
                        <td
                          className='text-left text-sm h-full relative p-3'
                          key={cell.id}
                          style={{
                            maxWidth: (cell.column.columnDef.size !== 150 ? cell.column.columnDef.size : 'auto')
                          }}
                        >
                          <span className='flex w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </span>
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>

          </table>

          <span className='inline-block w-full h-[70px] bg-[var(--background)]' />
          <span className='absolute bottom-0 left-0 inline-block w-full h-[100px] bg-linear-to-b from-transparent to-[var(--background)]' />

          {
            enableLazyLoad &&
            <div ref={observerRef} id='lazy-table' className='intersection-observer-lazy'>
              {
                loadingLazyLoad &&
                <h2>Cargando...</h2>
              }
            </div>
          }
        </ScrollArea>
      }

      {/* empty state */}
      {
        data.length === 0 &&
        <div className='w-full flex flex-col items-center gap-2 mt-24'>
          <IconListDetails className='h-6 w-6'/>
          <h3 className='text-2xl'>Sin información para mostrar.</h3>
        </div>
      }
    </>
  )

}
