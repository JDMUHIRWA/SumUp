import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function AddBudgetForm() {
  // State variables for form inputs
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [accounts, setAccounts] = useState("");

  // Use the createBudget mutation API
  const createBudget = useMutation(api.budget.create);
  // Use the getCurrent query API
  const currentUser = useQuery(api.users.current);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input values before submitting (e.g., check for empty fields or invalid amount)
    if (!amount || !date || !category || !accounts) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert amount to a number (for database consistency)
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await createBudget({
        accounts: accounts,
        categoryId: category,
        limit: parsedAmount,
        remaining: parsedAmount,
        spent: parsedAmount,
        date: "2025-03-13",
        userId: currentUser?._id || "",
      });

      // Reset form fields after successful submission
      setAmount("");
      setDate("");
      setCategory("");
      setAccounts("");
      alert("Budget created successfully!");
    } catch (e) {
      console.error("Error creating budget:", e);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-4">
          <h3 className="font-medium text-center mb-6">Add Budget</h3>

          {/* Form for entering budget details */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Budget Amount */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="budget-limit" className="text-sm font-medium">
                Accounts
              </label>
              <div className="col-span-2">
                <Select value={accounts} onValueChange={setAccounts}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank</SelectItem>
                    <SelectItem value="mobile-money">Mobile Money</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <label htmlFor="budget-limit" className="text-sm font-medium">
                Budget limit
              </label>
              <div className="col-span-2">
                <Input
                  id="budget-limit"
                  placeholder="Input your amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                  type="text"
                  prefix="RWF"
                />
              </div>
            </div>

            {/* Time Period */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="time-period" className="text-sm font-medium">
                Time Period
              </label>
              <div className="col-span-2">
                <Input
                  id="time-period"
                  placeholder="Set date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full"
                  type="date"
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <label htmlFor="categories" className="text-sm font-medium">
                Categories
              </label>
              <div className="col-span-2">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full  text-black">
              Add Budget
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
