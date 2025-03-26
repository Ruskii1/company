
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Download, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react'

interface TransactionHeaderProps {
  showFilters: boolean
  toggleFilters: () => void
  handleDownloadAllTransactions: () => void
}

export const TransactionHeader = ({
  showFilters,
  toggleFilters,
  handleDownloadAllTransactions
}: TransactionHeaderProps) => {
  return (
    <CardTitle className="flex items-center justify-between">
      <span>Transaction History</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadAllTransactions}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFilters}
          className="flex items-center gap-1"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </CardTitle>
  )
}
