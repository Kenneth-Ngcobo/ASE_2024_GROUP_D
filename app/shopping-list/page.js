

import ShoppingList from "../components/shopping-list/shoppingList"
import { ShoppingListProvider } from '../context/ShoppingListContext';

export default function ShoppingListPage() {
  return (
    <ShoppingListProvider>
      <div className="container mx-auto p-4">
        <ShoppingList />
      </div>
    </ShoppingListProvider>
  );
}
