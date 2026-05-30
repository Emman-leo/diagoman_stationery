import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
  icon: LucideIcon
  label: string
  value: number | string
  trend?: { value: string; positive: boolean }
}

export function StatCard({ icon: Icon, label, value, trend }: Props) {
  return (
    <Card className="border-tscolors-navy/10">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tscolors-navy/10">
          <Icon className="h-6 w-6 text-tscolors-navy" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-tscolors-navy">{value}</p>
          {trend && (
            <p
              className={cn(
                'mt-1 flex items-center gap-1 text-xs',
                trend.positive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.positive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {trend.value}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
