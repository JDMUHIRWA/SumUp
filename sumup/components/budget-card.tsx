"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function BudgetPage() {
  // Get the current user using Clerk's hook
  const currentUser = useQuery(api.users.current);
  const user = currentUser?._id;

  // Only run the query when user is available
  const budgets = useQuery(api.budget.getBudgetsByUser, { userId: user });

  if (!budgets) return <p>Loading budgets...</p>;
  if (budgets.length === 0) return <p>No budgets available.</p>;

  return (
    <>
      {budgets.map((budget) => {
        const progress = (budget.spent / budget.limit) * 100;
        return (
          <Card key={budget._id} className="p-4 shadow-md">
            <CardHeader>
              <CardTitle>{budget.accounts}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {budget.categoryId}
                </p>
                <p>
                  <span className="font-medium">Limit:</span>{" "}
                  {budget.limit.toLocaleString()} RWF
                </p>
                <p>
                  <span className="font-medium">Spent:</span>{" "}
                  {budget.spent.toLocaleString()} RWF
                </p>
                <p>
                  <span className="font-medium">Remaining:</span>{" "}
                  {budget.remaining.toLocaleString()} RWF
                </p>
              </CardDescription>
            </CardContent>
            <div className="px-4">
              <Progress
                value={progress}
                className="w-full bg-gray-200"
                barColor="bg-[#ffc23c]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {progress.toFixed(1)}% used
              </p>
            </div>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Date: {new Date(budget.date).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
