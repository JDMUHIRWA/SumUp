"use client";

import { GlobalDialog } from "@/components/custom-dialog";
import { TransactionForm } from "@/components/transaction";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { format } from "date-fns";

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

export default function TransactionDialog() {
  const currentUser = useQuery(api.users.current);
  const userId: Id<"users"> | undefined = currentUser?._id;

  const createTransaction = useMutation(api.transactions.createTransaction);

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
      description: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const values = form.getValues();

    const rawDate = values.date;
    const formattedDate = format(new Date(rawDate), "yyyy-MM-dd");

    if (!userId) {
      alert("User not loaded.");
      return;
    }

    try {
      await createTransaction({
        amount: values.amount,
        accountId: values.accountId as Id<"accounts">,
        recepient: values.recepient,
        date: formattedDate,
        type: values.type,
        invoiceNumber: values.invoiceNumber,
        description: values.description,
        category: values.category as Id<"categories">,
      });

      alert("Transaction saved!");
      form.reset();
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction.");
    }
  };

  return (
    <GlobalDialog
      title="New Transaction"
      description="Fill in the details to record a new payment or income."
      triggerLabel="Add Payment"
      submitLabel="Save"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-4xl mx-auto px-2">
        <TransactionForm form={form} userId={userId} />
      </div>
    </GlobalDialog>
  );
}
