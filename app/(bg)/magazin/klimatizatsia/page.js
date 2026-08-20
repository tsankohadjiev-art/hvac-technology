import ShopCatalog from "@/components/shop/ShopCatalog";
import { readProducts } from "@/lib/productStore";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Климатизация и ОВК — магазин",
};

export default async function ClimateShopPage() {
  const products = await readProducts();
  return (
    <ShopCatalog
      products={products}
      initialZone="climate"
      title="Климатизация и ОВК — продукти"
      description="Климатици, термопомпи, отопление и вентилация за комфортен и здравословен микроклимат."
      heroTheme="climate"
    />
  );
}
