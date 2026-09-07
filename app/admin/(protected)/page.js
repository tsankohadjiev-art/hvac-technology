import { readProducts } from "@/lib/productStore";
import { readSettings } from "@/lib/settingsStore";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [products, settings] = await Promise.all([readProducts(), readSettings()]);
  return <AdminDashboard initialProducts={products} initialSettings={settings} />;
}
