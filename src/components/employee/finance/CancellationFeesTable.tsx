import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguageStore, translations } from "@/lib/i18n"

interface CancellationFee {
  id: string
  date: string
  customer: string
  amount: number
  reason: string
}

const data: CancellationFee[] = [
  {
    id: "728ed52f",
    date: "2023-03-15",
    customer: "John Doe",
    amount: 50.00,
    reason: "Customer cancellation",
  },
  {
    id: "39cd12bb",
    date: "2023-03-10",
    customer: "Alice Smith",
    amount: 75.00,
    reason: "Service unavailable",
  },
  {
    id: "091b2dcf",
    date: "2023-03-05",
    customer: "Bob Johnson",
    amount: 60.00,
    reason: "Incorrect address",
  },
]

const columns: ColumnDef<CancellationFee>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "reason",
    header: "Reason",
  },
]

export function CancellationFeesTable() {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}
                 data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t.common.noDataAvailable}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
