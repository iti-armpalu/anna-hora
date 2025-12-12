"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/shopify/types/customer-normalized";
import { ShopifyAddress } from "@/lib/shopify/types/address";
import AddAddressDialog from "./add-address-dialog";
import EditAddressDialog from "./edit-address-dialog";
import { DeleteAddressDialog } from "./delete-address-dialog";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export function AddressesTab({ customer }: { customer: Customer }) {
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState<ShopifyAddress | null>(null);

    const router = useRouter();

    const addresses = customer.addresses;
    const defaultId = customer.defaultAddress?.id ?? null;

    function handleSuccess() {
        router.refresh();
    }

    return (

        <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="font-serif text-xl text-stone-800">Saved Addresses</CardTitle>
                    <Button
                        onClick={() => setAddOpen(true)}
                        className="bg-stone-800 hover:bg-stone-700 text-white"
                    >
                        Add New Address
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {
                    addresses.length === 0 && (
                        <p className="text-gray-600">You have no saved addresses.</p>
                    )
                }

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {addresses.map((address) => (
                        <Card key={address.id} className="border border-stone-200">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        {/* <h3 className="font-medium text-stone-800">{address.type}</h3> */}
                                        {address.id === defaultId && (
                                            <Badge variant="secondary" className="text-xs">
                                                Default
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="text-sm text-stone-600 space-y-1">
                                    <p className="font-medium text-stone-800">{address.firstName} {address.lastName}</p>
                                    <p>{address.address1}</p>
                                    {address.address2 && <p>{address.address2}</p>}
                                    <p>
                                        {address.city}, {address.province} {address.zip}
                                    </p>
                                    <p>{address.country}</p>
                                    {address.phone && <p>📞 {address.phone}</p>}
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setEditOpen(true);
                                        }}
                                    >
                                        Edit
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
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setDeleteOpen(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>


                {/* dialogs */}
                <AddAddressDialog open={addOpen} onOpenChange={setAddOpen} onSuccess={handleSuccess} />
                <EditAddressDialog open={editOpen} onOpenChange={setEditOpen} address={selectedAddress} onSuccess={handleSuccess} />
                <DeleteAddressDialog open={deleteOpen} onOpenChange={setDeleteOpen} addressId={selectedAddress?.id ?? null} onSuccess={handleSuccess} />
            </CardContent>
        </Card>
    );
}
