import { readProducts } from "@/lib/productStore";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const products = readProducts();
  return <AdminDashboard initialProducts={products} />;
}
