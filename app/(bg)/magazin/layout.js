import { CartProvider } from "@/components/shop/CartContext";
import CartDrawer from "@/components/shop/CartDrawer";
import FloatingCartButton from "@/components/shop/FloatingCartButton";

export default function MagazinLayout({ children }) {
  return (
    <CartProvider>
      {children}
      <FloatingCartButton />
      <CartDrawer />
    </CartProvider>
  );
}
