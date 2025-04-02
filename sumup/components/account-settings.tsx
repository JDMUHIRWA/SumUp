"use client";

import * as React from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash } from "lucide-react";
import { useState } from "react";
import { useQuery } from "convex/react";

export function AccountSettings() {
  // get current user
  const currentUser = useQuery(api.users.current);
  const user = currentUser ? currentUser._id : undefined;

  // Fetch accounts from Convex
  const createAccount = useMutation(api.accounts.createAccount);

  // fetch accounts by user
  const accounts = useQuery(
    api.accounts.getAccountsByUser,
    user ? { userId: user } : "skip"
  );

  const [newAccount, setNewAccount] = useState({ name: "", balance: 0 });
  // Toggle visibility
  const toggleVisibility = useMutation(api.accounts.toggleAccountVisibility);

  // delete account
  const deleteAcc = useMutation(api.accounts.deleteAccount);

  // Handle adding new account
  const handleNewAccount = async () => {
    if (newAccount.name.trim() && newAccount.balance > 0) {
      await createAccount({
        name: newAccount.name,
        balance: newAccount.balance,
        userId: user,
      });
      setNewAccount({ name: "", balance: 0 }); // Reset form
    }
  };

  return (
    <div>
      <div className=" mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {accounts?.map((account) => (
          <div
            key={account._id}
            className="p-4 w-full bg-[#DEDEDE] rounded-md shadow"
          >
            <div className="bg-[#FFC23D] flex justify-center text-black font-medium p-2 rounded">
              {account.name}
            </div>
            <div className="flex flex-row gap-2  w-full items-center justify-between mt-4">
              <div className="w-full flex items-center justify-between ">
                <p className="text-sm">Balance</p>
                <p className="text-base font-semibold">
                  {account.visible
                    ? `${account.balance.toLocaleString()} RFW`
                    : "XXXXXXXXXX"}
                </p>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      toggleVisibility({
                        id: account._id,
                        visible: !account.visible,
                      })
                    }
                  >
                    {account.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAcc({ id: account._id })}
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Form */}
      <div className="mt-8 flex items-center gap-4">
        <input
          type="text"
          placeholder="Account Name"
          className="border p-2 rounded-md"
          value={newAccount.name}
          onChange={(e) =>
            setNewAccount({ ...newAccount, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Balance"
          className="border p-2 rounded-md"
          value={newAccount.balance}
          onChange={(e) =>
            setNewAccount({ ...newAccount, balance: Number(e.target.value) })
          }
        />
        <Button onClick={handleNewAccount} className="bg-[#FFC23D]">
          NEW
        </Button>
        <Button variant="outline">SAVE</Button>
      </div>
    </div>
  );
}
