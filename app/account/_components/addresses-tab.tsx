"use client";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { ShopifyCustomer } from "@/lib/shopify/types";
import AddAddressDialog from "./add-address-dialog";
import EditAddressDialog from "./edit-address-dialog";
import { DeleteAddressDialog } from "./delete-address-dialog";
import { useRouter } from "next/navigation";

export function AddressesTab({ customer }: { customer: ShopifyCustomer }) {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const router = useRouter();

    const addresses = customer.addresses?.edges ?? [];
    const defaultId = customer.defaultAddress?.id;

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
                {addresses.map(({ node }) => (
                    <div key={node.id} className="border rounded p-4 bg-white shadow-sm">

                        <p className="font-medium">
                            {node.firstName} {node.lastName}
                        </p>
                        <p>{node.address1}</p>
                        {node.address2 && <p>{node.address2}</p>}
                        <p>
                            {node.city}, {node.province} {node.zip}
                        </p>
                        <p>{node.country}</p>
                        {node.phone && <p>📞 {node.phone}</p>}

                        {node.id === defaultId && (
                            <p className="text-sm text-green-600 font-medium mt-2">Default Address</p>
                        )}

                        <div className="flex gap-3 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedAddress(node);
                                    setEditOpen(true);
                                }}
                            >
                                Edit
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={() => {
                                    setSelectedAddress(node);
                                    setDeleteOpen(true);
                                }}
                            >
                                Delete
                            </Button>

                            {node.id !== defaultId && (
                                <Button
                                    onClick={async () => {
                                        await fetch("/api/account/address/default", {
                                            method: "POST",
                                            body: JSON.stringify({ id: node.id }),
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
