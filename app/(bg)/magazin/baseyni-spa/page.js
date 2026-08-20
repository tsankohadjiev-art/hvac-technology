import ShopCatalog from "@/components/shop/ShopCatalog";
import { readProducts } from "@/lib/productStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Басейни и СПА — магазин",
};

export default function PoolShopPage() {
  const products = readProducts();
  return (
    <ShopCatalog
      products={products}
      initialZone="pool"
      title="Басейни и СПА — продукти"
      description="Филтрация, дезинфекция, отопление и уелнес оборудване за басейн, СПА и градина."
      heroTheme="aqua"
    />
  );
}
