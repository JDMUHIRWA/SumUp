"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { Id } from "@/convex/_generated/dataModel";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  amount: z.number().min(0, { message: "Amount must be a positive number." }),
  category: z.string().min(2, { message: "Category must be selected." }),
  date: z.string({ message: "Invalid date." }),
  invoiceNumber: z.string({ message: "Invoice number is required." }),
  description: z.string().optional(),
  type: z.enum(["income", "expense"], {
    errorMap: () => ({ message: "Type is required." }),
  }),
  recepient: z.string().min(2, {
    message: "Recepient must be at least 2 characters.",
  }),
  accountId: z.string().min(2, { message: "Account must be selected." }),
});

export function TransactionForm() {
  const currentUser = useQuery(api.users.current);
  const user = currentUser ? currentUser._id : undefined;

  const categories = useQuery(
    api.categories.getCategoriesByUser,
    user ? { userId: user } : "skip"
  );
  const accounts = useQuery(
    api.accounts.getAccountsByUser,
    user ? { userId: user } : "skip"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      category: "",
      date: "",
      invoiceNumber: "",
      type: "expense",
      recepient: "",
      accountId: "",
    },
  });

  const saveFormData = useMutation(api.transactions.createTransaction);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const transactionData = {
        category: values.category as Id<"categories">,
        accountId: values.accountId as Id<"accounts">,
        invoiceNumber: values.invoiceNumber,
        amount: values.amount,
        type: values.type,
        recepient: values.recepient,
        date: values.date,
        description: values.description,
      };

      await saveFormData(transactionData);
      alert("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded border px-2 py-2 text-sm"
                >
                  <option value="">Select a category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="invoiceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invoice Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Invoice Number"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recepient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recepient</FormLabel>
              <FormControl>
                <Input
                  placeholder="Recepient"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded border px-2 py-2 text-sm"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded border px-2 py-2 text-sm"
                >
                  <option>Select an account</option>
                  {accounts?.map((acc) => (
                    <option key={acc._id} value={acc._id}>
                      {acc.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-2">
          <Button type="submit" className="w-full bg-[#ffc23c] text-black">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
