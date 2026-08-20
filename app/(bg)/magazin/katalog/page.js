import ShopCatalog from "@/components/shop/ShopCatalog";
import { readProducts } from "@/lib/productStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Всички продукти — магазин",
};

export default async function CatalogPage() {
  const products = await readProducts();
  return <ShopCatalog products={products} initialZone="all" />;
}
