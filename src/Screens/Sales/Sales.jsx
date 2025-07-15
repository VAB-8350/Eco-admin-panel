import { columns } from './columns'
import { DataTable } from './Table'

export default function Ventas() {

  const data = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    {
      id: '489e1d42',
      amount: 125,
      status: 'processing',
      email: 'example@gmail.com',
    },
    {
      id: '489e1d46',
      amount: 125,
      status: 'Done',
      email: 'example@gmail.com',
    }
  ]

  return (
    <div>
      Ventas
      <DataTable columns={columns} data={data} />
    </div>
  )
}
