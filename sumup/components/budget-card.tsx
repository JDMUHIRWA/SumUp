// components/budget-card.tsx
import { Card, CardContent } from "@/components/ui/card";

interface BudgetCardProps {
  title: string;
  budgetLimit: number;
  currentSpending: number;
  remainingAmount: number;
  progress: number;
  currency?: string;
}

export default function BudgetCard({
  title,
  budgetLimit,
  currentSpending,
  remainingAmount,
  progress,
  currency = "RWF",
}: BudgetCardProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-medium text-center">{title}</h3>

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Budget limit</span>
          <span className="text-right font-medium">
            {budgetLimit
              ? `${budgetLimit.toLocaleString()} ${currency}`
              : `0 ${currency}`}
          </span>

          <span className="text-muted-foreground">Current Spending</span>
          <span className="text-right font-medium">
            {currentSpending
              ? `${currentSpending.toLocaleString()} ${currency}`
              : `0 ${currency}`}
          </span>

          <span className="text-muted-foreground">Remaining Amount</span>
          <span className="text-right font-medium">
            {remainingAmount
              ? `${remainingAmount.toLocaleString()} ${currency}`
              : `0 ${currency}`}
          </span>

          <span className="text-muted-foreground">Progress</span>
          <span className="text-right font-medium">{progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
