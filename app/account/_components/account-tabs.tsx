"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShopifyCustomer } from "@/lib/types/order";
import { OrdersTab } from "./orders-tab";


export default function AccountTabs({ customer }: { customer: ShopifyCustomer }) {
  return (
    <Tabs defaultValue="orders" className="mt-8">

      {/* Header Tab Bar */}
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="addresses">Addresses</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      {/* ORDERS TAB */}
      <TabsContent value="orders" className="py-6">
        <OrdersTab customer={customer} />
      </TabsContent>

      {/* PROFILE TAB */}
      <TabsContent value="profile" className="py-6">
        <ProfileTab customer={customer} />
      </TabsContent>

      {/* ADDRESSES TAB */}
      <TabsContent value="addresses" className="py-6">
        <AddressesTab customer={customer} />
      </TabsContent>

      {/* SETTINGS TAB */}
      <TabsContent value="settings" className="py-6">
        <SettingsTab customer={customer} />
      </TabsContent>

    </Tabs>
  );
}

/** -----------------------------
 *  SUB COMPONENTS
 *  You can extract them into separate files later if needed.
 *  ----------------------------- 
**/


function ProfileTab({ customer }: { customer: ShopifyCustomer }) {
  return (
    <div>
      <p className="text-gray-700 mb-2">
        <strong>First Name:</strong> {customer.firstName ?? "-"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Last Name:</strong> {customer.lastName ?? "-"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {customer.email}
      </p>
    </div>
  );
}

function AddressesTab({ customer }: { customer: ShopifyCustomer }) {
  return (
    <div>
      <p className="mb-2 font-medium">Addresses</p>
      <p className="text-gray-600 text-sm">
        Shopify Storefront API supports addresses — you can add add/edit here.
      </p>
    </div>
  );
}

function SettingsTab({ customer }: { customer: ShopifyCustomer }) {
  return (
    <div>
      <p className="mb-2 font-medium">Settings</p>
      <p className="text-gray-600 text-sm">
        This can include password change, notification settings, etc.
      </p>
    </div>
  );
}
