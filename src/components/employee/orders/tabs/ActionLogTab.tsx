
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { ActionLogEntry } from "@/types/order"

interface ActionLogTabProps {
  actionLog: ActionLogEntry[]
}

export const ActionLogTab = ({ actionLog }: ActionLogTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Action Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actionLog && actionLog.length > 0 ? (
            <ul className="space-y-3">
              {actionLog.map((entry, index) => (
                <li key={index} className="border-l-4 border-primary pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{entry.action}</span>
                    <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-muted-foreground">By: </span>
                    <span>{entry.performedBy}</span>
                  </div>
                  {entry.details && (
                    <p className="text-sm mt-1 text-muted-foreground">
                      {entry.details}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No action log entries available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
