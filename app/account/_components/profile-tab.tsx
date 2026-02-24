"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AccountVM } from "../page";

export function ProfileTab({ customer }: { customer: AccountVM }) {
  const router = useRouter();

  // If you only have displayName today, split it for MVP:
  const [firstName, setFirstName] = useState(() => {
    const parts = (customer.displayName ?? "").trim().split(" ");
    return parts[0] ?? "";
  });
  const [lastName, setLastName] = useState(() => {
    const parts = (customer.displayName ?? "").trim().split(" ");
    return parts.slice(1).join(" ") ?? "";
  });

  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        const msg =
          data?.errors?.[0]?.message ??
          data?.error ??
          "Could not update profile";
        toast.error("Update failed", { description: msg });
        return;
      }

      toast.success("Profile updated");
      router.refresh(); // re-fetch server account page data
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="font-serif text-xl text-stone-800">
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-stone-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-stone-300"
            />
          </div>
        </div>

        {/* Keep email read-only for now */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={customer.email ?? ""}
            readOnly
            className="border-stone-300 bg-stone-50"
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-anna-green-950 hover:bg-anna-green-800 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
