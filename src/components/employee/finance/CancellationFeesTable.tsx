
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
import { CancellationFee } from "@/types/finance"
import { formatCurrency } from "@/utils/formatters"

interface CancellationFeesTableProps {
  fees?: CancellationFee[]
}

const data: CancellationFee[] = [
  {
    id: "728ed52f",
    orderId: "ORD-123",
    customerName: "John Doe",
    amount: 50.00,
    reason: "Customer cancellation",
    chargedAt: new Date("2023-03-15"),
    createdAt: new Date("2023-03-15"),
  },
  {
    id: "39cd12bb",
    orderId: "ORD-456",
    customerName: "Alice Smith",
    amount: 75.00,
    reason: "Service unavailable",
    chargedAt: new Date("2023-03-10"),
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "091b2dcf",
    orderId: "ORD-789",
    customerName: "Bob Johnson",
    amount: 60.00,
    reason: "Incorrect address",
    chargedAt: new Date("2023-03-05"),
    createdAt: new Date("2023-03-05"),
  },
]

export function CancellationFeesTable({ fees }: CancellationFeesTableProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  const financeT = t.finance
  
  const displayData = fees || data;
  
  const columns: ColumnDef<CancellationFee>[] = [
    {
      accessorKey: "chargedAt",
      header: financeT.date,
      cell: ({ row }) => {
        const date = row.getValue("chargedAt") as Date;
        return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US');
      }
    },
    {
      accessorKey: "customerName",
      header: financeT.customer,
    },
    {
      accessorKey: "amount",
      header: financeT.amount,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return formatCurrency(amount);
      }
    },
    {
      accessorKey: "reason",
      header: financeT.reason,
    },
  ]

  const table = useReactTable({
    data: displayData,
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
                  {financeT.noCancellationFees}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
