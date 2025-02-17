
import * as React from "react"
import { Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface TimePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minutesList = Array.from({ length: 60 }, (_, i) => i)
  const hoursList = Array.from({ length: 12 }, (_, i) => i + 1)

  const [isAM, setIsAM] = React.useState(date.getHours() < 12)

  const handleHourChange = (hour: string) => {
    const newDate = new Date(date)
    let hourValue = parseInt(hour)
    if (!isAM && hourValue !== 12) hourValue += 12
    if (isAM && hourValue === 12) hourValue = 0
    newDate.setHours(hourValue)
    setDate(newDate)
  }

  const handleMinuteChange = (minute: string) => {
    const newDate = new Date(date)
    newDate.setMinutes(parseInt(minute))
    setDate(newDate)
  }

  const toggleAMPM = () => {
    const newDate = new Date(date)
    const currentHours = newDate.getHours()
    
    if (isAM) {
      if (currentHours < 12) newDate.setHours(currentHours + 12)
    } else {
      if (currentHours >= 12) newDate.setHours(currentHours - 12)
    }
    
    setIsAM(!isAM)
    setDate(newDate)
  }

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-start text-left font-normal"
        >
          <Clock className="mr-2 h-4 w-4" />
          {displayHours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')} {isAM ? 'AM' : 'PM'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto p-2">
        <Select
          onValueChange={handleHourChange}
          defaultValue={displayHours.toString()}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={displayHours.toString().padStart(2, '0')} />
          </SelectTrigger>
          <SelectContent>
            {hoursList.map((hour) => (
              <SelectItem key={hour} value={hour.toString()}>
                {hour.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleMinuteChange}
          defaultValue={minutes.toString()}
        >
          <SelectTrigger className="w-[70px] mx-2">
            <SelectValue placeholder={minutes.toString().padStart(2, '0')} />
          </SelectTrigger>
          <SelectContent>
            {minutesList.map((minute) => (
              <SelectItem key={minute} value={minute.toString()}>
                {minute.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          className="w-[60px]"
          onClick={toggleAMPM}
        >
          {isAM ? 'AM' : 'PM'}
        </Button>
      </PopoverContent>
    </Popover>
  )
}
