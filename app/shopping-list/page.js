import ShoppingList from "../components/shoppingList"
import { ShoppingListProvider } from '../context/ShoppingListContext';

/**
 * Shopping List page component that provides a list of items for recipes.
 *
 * @returns {JSX.Element} The rendered shopping list page.
 */
export default function ShoppingListPage() {
  return (
    <ShoppingListProvider>
      <div className="container mx-auto p-4">
        <ShoppingList />
      </div>
    </ShoppingListProvider>
  );
}
