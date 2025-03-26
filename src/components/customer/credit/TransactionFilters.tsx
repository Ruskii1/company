
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { TransactionFilterState, TransactionType } from '@/types/transaction'
import { DateRange } from 'react-day-picker'

interface TransactionFiltersProps {
  filters: TransactionFilterState
  onFilterChange: (filters: Partial<TransactionFilterState>) => void
}

export const TransactionFilters = ({ filters, onFilterChange }: TransactionFiltersProps) => {
  const handleTypeChange = (value: TransactionType) => {
    onFilterChange({ transactionType: value })
  }
  
  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      onFilterChange({ dateRange: date })
    }
  }
  
  return (
    <div className="flex gap-2 items-center">
      <Select value={filters.transactionType} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Transactions</SelectItem>
          <SelectItem value="credit">Credits Only</SelectItem>
          <SelectItem value="debit">Debits Only</SelectItem>
        </SelectContent>
      </Select>
      
      <DateRangePicker
        date={filters.dateRange}
        onDateChange={handleDateChange}
      />
    </div>
  )
}
