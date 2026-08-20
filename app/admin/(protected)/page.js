import { readProducts } from "@/lib/productStore";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await readProducts();
  return <AdminDashboard initialProducts={products} />;
}
