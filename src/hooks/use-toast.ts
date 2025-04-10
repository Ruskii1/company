
// This file re-exports from @/components/ui/use-toast which itself is a re-export
// The correct pattern is to import from @/hooks/use-toast directly
import { toast, useToast } from "@/components/ui/toast"

export { toast, useToast }
