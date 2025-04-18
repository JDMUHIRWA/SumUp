"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface GlobalDialogProps {
  title: string;
  description: string;
  triggerLabel: string;
  triggerIcon?: ReactNode;
  children: ReactNode;
  submitLabel: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export function GlobalDialog({
  title,
  description,
  triggerLabel,
  triggerIcon,
  children,
}: GlobalDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-[#ffc23c]">
          {triggerIcon} {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
