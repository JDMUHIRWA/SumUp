"use client";

import * as React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface AccountSettingsProps {
  hideCreate?: boolean;
}

export function AccountSettings({ hideCreate = false }: AccountSettingsProps) {
  const currentUser = useQuery(api.users.current);
  const user = currentUser ? currentUser._id : undefined;
  const accounts = useQuery(
    api.accounts.getAccountsByUser,
    user ? { userId: user } : "skip"
  );

  const toggleVisibility = useMutation(api.accounts.toggleAccountVisibility);
  const deleteAcc = useMutation(api.accounts.deleteAccount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">My Accounts</h2>
        {!hideCreate && <CreateAccountDialog userId={user} />}
      </div>

      {/* Account Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {accounts?.map((account) => (
          <div
            key={account._id}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="bg-[#FFC23D] text-black font-medium text-center py-2 rounded-md">
              {account.name}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-base font-medium mt-1">
                  {account.visible
                    ? `${account.balance.toLocaleString()} RFW`
                    : "XXXXXXXXXX"}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100"
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
                  className="hover:bg-red-100"
                  onClick={() => deleteAcc({ id: account._id })}
                >
                  <Trash size={18} className="text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dialog Component for Creating Accounts
function CreateAccountDialog({ userId }: { userId?: string }) {
  const createAccount = useMutation(api.accounts.createAccount);
  const [newAccount, setNewAccount] = useState({ name: "", balance: 0 });

  const handleNewAccount = async () => {
    if (newAccount.name.trim() && newAccount.balance > 0) {
      await createAccount({
        name: newAccount.name,
        balance: newAccount.balance,
        userId: userId!,
      });
      setNewAccount({ name: "", balance: 0 });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={18} />
          Add Account
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create New Account
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Account Name"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFC23D] focus:outline-none text-sm"
            value={newAccount.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Balance"
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFC23D] focus:outline-none text-sm"
            value={newAccount.balance}
            onChange={(e) =>
              setNewAccount({ ...newAccount, balance: Number(e.target.value) })
            }
          />
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button
            onClick={handleNewAccount}
            className="bg-[#FFC23D] hover:bg-[#e5b02c] text-black font-medium"
          >
            Create
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-900">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
