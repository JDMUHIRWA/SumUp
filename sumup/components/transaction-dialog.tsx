"use client";

import { GlobalDialog } from "@/components/custom-dialog";
import { TransactionForm } from "@/components/transaction";

export default function TransactionDialog() {
  return (
    <GlobalDialog
      title="New Transaction"
      description="Fill in the details to record a new payment or income."
      triggerLabel="Add Payment"
      submitLabel="Save"
      onSubmit={(e) => e.preventDefault()}
    >
      <TransactionForm />
    </GlobalDialog>
  );
}
