import { head } from "@vercel/blob";

const BLOB_STORE_ID = process.env.BLOB_STORE_ID;

// Хранилището е частно, затова обслужваме снимките през този маршрут:
// взимаме адреса от Blob сървърно (с OIDC удостоверяване) и го препращаме
// на посетителя, вместо той да вика директно защитения адрес на Blob.
export async function GET(request, { params }) {
  const { path } = await params;
  const pathname = path.join("/");

  try {
    const info = await head(pathname, { storeId: BLOB_STORE_ID });
    const res = await fetch(info.url, {
      headers: process.env.VERCEL_OIDC_TOKEN
        ? { Authorization: `Bearer ${process.env.VERCEL_OIDC_TOKEN}` }
        : {},
    });

    if (!res.ok || !res.body) {
      return new Response(null, { status: 404 });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": info.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
