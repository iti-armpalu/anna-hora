"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShopifyAddress } from "@/lib/shopify/types/address";

// ----------------------------------------
// Types
// ----------------------------------------

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  address: ShopifyAddress | null;
  onSuccess: () => void;
}

interface AddressForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

// ----------------------------------------
// Component
// ----------------------------------------

export default function EditAddressDialog({
  open,
  onOpenChange,
  address,
  onSuccess,
}: EditAddressDialogProps) {
  const [loading, setLoading] = useState(false);

  // Ensure we always have defaults
  const [form, setForm] = useState<AddressForm>({
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

  // Hydrate form when user selects an address
  useEffect(() => {
    if (!address) return;
    setForm({
      firstName: address.firstName ?? "",
      lastName: address.lastName ?? "",
      address1: address.address1 ?? "",
      address2: address.address2 ?? "",
      city: address.city ?? "",
      province: address.province ?? "",
      zip: address.zip ?? "",
      country: address.country ?? "",
      phone: address.phone ?? "",
    });
  }, [address]);

  // Type-safe field updater
  function updateField<K extends keyof AddressForm>(key: K, value: AddressForm[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    if (!address) return;

    setLoading(true);

    const res = await fetch("/api/account/address/update", {
      method: "POST",
      body: JSON.stringify({
        id: address.id,
        address: form,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      onOpenChange(false);
      onSuccess();
    }
  }

  if (!address) return null; // Nothing to edit yet

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel
              label="First Name"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />

            <InputWithLabel
              label="Last Name"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </div>

          <InputWithLabel
            label="Address Line 1"
            value={form.address1}
            onChange={(e) => updateField("address1", e.target.value)}
          />

          <InputWithLabel
            label="Address Line 2"
            value={form.address2}
            onChange={(e) => updateField("address2", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel
              label="City"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
            />

            <InputWithLabel
              label="Province"
              value={form.province}
              onChange={(e) => updateField("province", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputWithLabel
              label="ZIP"
              value={form.zip}
              onChange={(e) => updateField("zip", e.target.value)}
            />

            <InputWithLabel
              label="Country"
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
            />
          </div>

          <InputWithLabel
            label="Phone"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading} className="w-full mt-4">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------
// Small Reusable Input Component
// ----------------------------------------

function InputWithLabel({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input value={value} onChange={onChange} />
    </div>
  );
}
