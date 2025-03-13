
interface ServiceInfoSectionProps {
  serviceType: string
  pickupTime: string
}

export const ServiceInfoSection = ({ serviceType, pickupTime }: ServiceInfoSectionProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1">Service Type</h3>
        <p>{serviceType}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-1">Pickup Time</h3>
        <p>{pickupTime}</p>
      </div>
    </>
  )
}
