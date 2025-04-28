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
  submitLabel,
  onSubmit,
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

        {/* Wrap children inside a form if onSubmit is provided */}
        {onSubmit ? (
          <form onSubmit={onSubmit} className="space-y-4">
            {children}
            <DialogFooter>
              <Button type="submit" variant="default">
                {submitLabel}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <>
            {children}
            <DialogFooter>
              <Button variant="default">{submitLabel}</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
