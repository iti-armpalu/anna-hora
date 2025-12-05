"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/shopify/types/customer-normalized";
import { ShopifyAddress } from "@/lib/shopify/types/address";
import AddAddressDialog from "./add-address-dialog";
import EditAddressDialog from "./edit-address-dialog";
import { DeleteAddressDialog } from "./delete-address-dialog";
import { useRouter } from "next/navigation";


export function AddressesTab({ customer }: { customer: Customer }) {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState<ShopifyAddress | null>(null);

    const router = useRouter();

    const addresses = customer.addresses;
    const defaultId = customer.defaultAddress?.id ?? null;

    function handleSuccess() {
        router.refresh(); // ⬅ The correct way in App Router
    }

    return (
        <div className="space-y-6">

            {/* ADD ADDRESS BUTTON */}
            <Button onClick={() => setAddOpen(true)}>Add Address</Button>

            {/* ADDRESS LIST */}
            {addresses.length === 0 && (
                <p className="text-gray-600">You have no saved addresses.</p>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                {addresses.map((address) => (
                    <div key={address.id} className="border rounded p-4 bg-white shadow-sm">

                        <p className="font-medium">
                            {address.firstName} {address.lastName}
                        </p>
                        <p>{address.address1}</p>
                        {address.address2 && <p>{address.address2}</p>}
                        <p>
                            {address.city}, {address.province} {address.zip}
                        </p>
                        <p>{address.country}</p>
                        {address.phone && <p>📞 {address.phone}</p>}

                        {address.id === defaultId && (
                            <p className="text-sm text-green-600 font-medium mt-2">Default Address</p>
                        )}

                        <div className="flex gap-3 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedAddress(address);
                                    setEditOpen(true);
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setSelectedAddress(address);
                                    setDeleteOpen(true);
                                }}
                            >
                                Delete
                            </Button>

                            {address.id !== defaultId && (
                                <Button
                                    onClick={async () => {
                                        await fetch("/api/account/address/default", {
                                            method: "POST",
                                            body: JSON.stringify({ id: address.id }),
                                        });
                                        handleSuccess();
                                    }}
                                >
                                    Set Default
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* dialogs */}
            <AddAddressDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={handleSuccess} />
            <EditAddressDialog open={editOpen} onOpenChange={setEditOpen} address={selectedAddress} onSuccess={handleSuccess} />
            <DeleteAddressDialog open={deleteOpen} onOpenChange={setDeleteOpen} addressId={selectedAddress?.id ?? null} onSuccess={handleSuccess} />
        </div>
    );
}
