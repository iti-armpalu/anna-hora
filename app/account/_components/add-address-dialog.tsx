"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
}

export default function AddAddressDialog({ open, onOpenChange, onSuccess }: AddAddressDialogProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
    phone: "",
  });

  function updateField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setLoading(true);

    const res = await fetch("/api/account/address/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: form }),
    });

    const data = await res.json();

    if (data.ok) {
      onOpenChange(false);
      onSuccess();
    }

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel label="First Name" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} />
            <InputWithLabel label="Last Name" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} />
          </div>

          <InputWithLabel label="Address Line 1" value={form.address1} onChange={(e) => updateField("address1", e.target.value)} />
          <InputWithLabel label="Address Line 2" value={form.address2} onChange={(e) => updateField("address2", e.target.value)} />
          
          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel label="City" value={form.city} onChange={(e) => updateField("city", e.target.value)} />
            <InputWithLabel label="Province" value={form.province} onChange={(e) => updateField("province", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel label="ZIP" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
            <InputWithLabel label="Country" value={form.country} onChange={(e) => updateField("country", e.target.value)} />
          </div>

          <InputWithLabel label="Phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full mt-4">
          {loading ? "Saving..." : "Save Address"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function InputWithLabel({ label, value, onChange }: { label: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} />
    </div>
  );
}
