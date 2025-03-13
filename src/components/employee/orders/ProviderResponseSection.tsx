
import { Check, X, AlertCircle } from "lucide-react"

interface ProviderResponseSectionProps {
  acceptedBy?: string
  declinedBy?: string[]
  pendingProviders?: string[]
}

export const ProviderResponseSection = ({ 
  acceptedBy, 
  declinedBy, 
  pendingProviders 
}: ProviderResponseSectionProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" />
          Accepted By
        </h3>
        <p>{acceptedBy || 'N/A'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <X className="h-5 w-5 text-red-500" />
          Declined By
        </h3>
        {declinedBy && declinedBy.length > 0 ? (
          <ul className="list-disc pl-5">
            {declinedBy.map((provider, index) => (
              <li key={index}>{provider}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          Pending Response
        </h3>
        {pendingProviders && pendingProviders.length > 0 ? (
          <ul className="list-disc pl-5">
            {pendingProviders.map((provider, index) => (
              <li key={index}>{provider}</li>
            ))}
          </ul>
        ) : (
          <p>None</p>
        )}
      </div>
    </>
  )
}
