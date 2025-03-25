// columns.tsx

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export type Category = {
  _id: string;
  name: string;
};

export const columns = [
  {
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => <div className="p-2">{row.getValue("name")}</div>,
  },

  // Actions column
  {
    id: "actions",
    header: () => <div className="text-right mx-4">Actions</div>,
    cell: ({ row }) => {
      const category = row.original;

      // Use the mutation here within the cell renderer
      const deleteCategory = useMutation(api.categories.deleteCategory);

      const handleDelete = async () => {
        try {
          await deleteCategory({ _id: category._id });
          console.log("Category deleted");
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };

      return (
        <div className="flex justify-end mx-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleDelete}>
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
