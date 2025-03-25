"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Buttons() {
  // State variables for form inputs
  const [name, setName] = useState("");

  // Use the createCategory mutation API
  const createCategory = useMutation(api.categories.create);

  // Use the getCurrent query API
  const currentUser = useQuery(api.users.current);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input values before submitting (e.g., check for empty fields)
    if (!name) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createCategory({
        name: name,
        userId: currentUser?._id || "",
      });

      // Reset form fields after successful submission
      setName("");
      alert("Category created successfully!");
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error creating category:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-[#ffc23c]">
            New
          </Button>
        </DialogTrigger>
        {/* <DialogTitle>Edit profile</DialogTitle> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Add a new category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#ffc23c] text-black outline-none"
              onClick={handleSubmit}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
