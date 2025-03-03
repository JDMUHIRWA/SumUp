import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export function Transaction() {
  const transactions = [
    { type: "received", amount: "1,000,000 RWF" },
    { type: "sent", amount: "1,000,000 RWF" },
    { type: "received", amount: "1,000,000 RWF" },
    { type: "sent", amount: "1,000,000 RWF" },
  ];
  return (
    <>
      <Table>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="border-b border-[#FFC23D]">
              <TableCell className="w-12">
                <div
                  className={`rounded-full p-2 ${
                    transaction.type === "received"
                      ? "bg-gray-100"
                      : "bg-amber-100"
                  }`}
                >
                  {transaction.type === "received" ? (
                    <ArrowDownToLine className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ArrowUpFromLine className="w-5 h-5 text-amber-600" />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-gray-700">
                You have {transaction.type} {transaction.amount} on your
                Account.
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
