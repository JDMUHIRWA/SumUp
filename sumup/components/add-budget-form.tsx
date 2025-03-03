// components/add-budget-form.tsx
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

export default function AddBudgetForm() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ amount, date, category });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h2 className="text-center font-medium text-lg mb-6">
          Add your budget
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
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
                prefix={<span>RWF</span>}
              />
            </div>
          </div>

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

          <div className="pt-4 flex justify-center">
            <Button
              type="submit"
              className="bg-amber-400 text-black hover:bg-amber-500"
            >
              Add your budget
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
