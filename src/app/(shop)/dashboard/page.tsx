import React from 'react';
import ShopHeaderActions from '@/app/(shop)/_components/shop-header-actions';
import AccountInfo from '@/app/(shop)/_components/account-info';
import DashboardContent from '@/app/(shop)/_components/dashboard-content';

export default function ShopDashboard() {
  return (
    <div className="flex h-screen">
      <aside className="w-[250px] border-r">
        <AccountInfo />
      </aside>
      <main className="flex-1 flex flex-col">
        <ShopHeaderActions />
        <div className="flex-1 p-6 overflow-auto">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
}