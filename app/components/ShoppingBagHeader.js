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
      className="relative p-2 hover:bg-[#edd282] rounded-full transition-colors"
      aria-label="Shopping List"
    >
      <ShoppingBag className="h-6 w-6 text-[#fc9d4f]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#fc9d4f] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
};

export default ShoppingBagHeader;