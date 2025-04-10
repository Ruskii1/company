
import { CarDetailsComponent } from '@/components/customer/CarDetailsComponent'

interface CarDetailsTabProps {
  car?: {
    model: string
    year: string
    licensePlate: string
    licensePlateArabic: string
    vin: string
  }
}

export const CarDetailsTab = ({ car }: CarDetailsTabProps) => {
  // Create car object with the expected properties
  const formattedCar = {
    plate: car?.licensePlate || '',
    plateArabic: car?.licensePlateArabic || '',
    model: car?.model || '',
    name: car?.model || '', // Using model as name
    vin: car?.vin || ''
  }
  
  return <CarDetailsComponent car={formattedCar} />
}
