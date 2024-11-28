'use client';

import { useShoppingList } from '../context/ShoppingListContext';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';

const ShoppingBagHeader = () => {
  const { state } = useShoppingList();
  const router = useRouter();

  const itemCount = state.items.length;

  return (
    <button
      onClick={() => router.push('/shopping-list')}
      className="relative p-2  rounded-full transition-colors"
      aria-label="Shopping List"
    >
      <ShoppingBag className="h-6 w-6 text-[#020123] hover:text-[#ff4f1a]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1  text-[#ff4f1a] text-xs font-bold  h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default ShoppingBagHeader;