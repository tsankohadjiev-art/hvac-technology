import CheckoutForm from "@/components/shop/CheckoutForm";
import { readSettings } from "@/lib/settingsStore";

export const metadata = {
  title: "Поръчка — магазин",
};

export default async function CheckoutPage() {
  const settings = await readSettings();
  return <CheckoutForm contactEmail={settings.email} />;
}
