
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Car } from "lucide-react"
import { useLanguageStore } from "@/lib/i18n"

interface CarDetailsComponentProps {
  car: {
    plate: string
    plateArabic?: string
    model: string
    name: string
    vin: string
  }
}

export const CarDetailsComponent = ({ car }: CarDetailsComponentProps) => {
  const { language } = useLanguageStore()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Vehicle Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">License Plate</TableCell>
              <TableCell>{car.plate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">License Plate (Arabic)</TableCell>
              <TableCell dir={language === 'ar' ? "rtl" : "ltr"} className="font-arabic">
                {car.plateArabic || "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Model</TableCell>
              <TableCell>{car.model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Type</TableCell>
              <TableCell>{car.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">VIN</TableCell>
              <TableCell>{car.vin}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
