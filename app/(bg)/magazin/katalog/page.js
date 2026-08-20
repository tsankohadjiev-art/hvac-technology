import ShopCatalog from "@/components/shop/ShopCatalog";
import { readProducts } from "@/lib/productStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Всички продукти — магазин",
};

export default function CatalogPage() {
  const products = readProducts();
  return <ShopCatalog products={products} initialZone="all" />;
}
