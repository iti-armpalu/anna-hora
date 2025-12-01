"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteAddressDialog({
  open,
  onOpenChange,
  addressId,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  addressId: string | null;
  onSuccess: () => void;
}) {
  async function handleDelete() {
    if (!addressId) return;

    const res = await fetch("/api/account/address/delete", {
      method: "POST",
      body: JSON.stringify({ id: addressId }),
    });

    const data = await res.json();

    if (data.ok) {
      onOpenChange(false);
      onSuccess();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Address?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
