import { Bell, HelpCircle, MessageCircle } from 'lucide-react';

export default function ShopHeaderActions() {
  return (
    <div className="flex justify-end items-center p-4 border-b">
      <MessageCircle className="mr-4 cursor-pointer" />
      <Bell className="mr-4 cursor-pointer" />
      <HelpCircle className="cursor-pointer" />
    </div>
  );
}