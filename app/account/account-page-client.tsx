"use client";

import type { AccountVM } from "./page";
import AccountHeader from "./_components/account-header";
import AccountTabs from "./_components/account-tabs";

export default function AccountClientPage({ customer }: { customer: AccountVM }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <AccountHeader customer={customer} />
      <AccountTabs customer={customer} />
    </div>
  );
}