import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <Card className="w-full max-w-md">
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
