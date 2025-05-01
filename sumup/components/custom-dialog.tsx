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
import { ReactNode, FormEvent } from "react";

interface GlobalDialogProps {
  title: string;
  description: string;
  triggerLabel: string;
  triggerIcon?: ReactNode;
  children: ReactNode;
  submitLabel: string;
  onSubmit?: (e: FormEvent) => void;
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
        <Button variant="default" className="bg-[#ffc23c] text-black">
          {triggerIcon} {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[80vh] overflow-y-auto sm:rounded-4xl p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {onSubmit ? (
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              {children}
              <DialogFooter className="mt-6">
                <Button type="submit" className="bg-[#ffc23c] text-black">
                  {submitLabel}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <>
              <div className="mt-4">{children}</div>
              <DialogFooter className="mt-6">
                <Button className="bg-[#ffc23c] text-black">
                  {submitLabel}
                </Button>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
