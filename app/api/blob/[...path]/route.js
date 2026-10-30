import { head } from "@vercel/blob";
import { unstable_cache } from "next/cache";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Качените снимки получават уникално, непроменяемо име (виж upload/route.js
// — crypto.randomUUID()), затова съдържанието зад даден pathname никога не
// се сменя. Безопасно е да кешираме главата (head) завинаги вместо да викаме
// Blob `head()` при всяко зареждане на снимка от всеки посетител — без това
// снимките сами по себе си бяха значителна част от Blob операциите.
const getBlobHead = unstable_cache(
  async (pathname) => head(pathname, { token: BLOB_TOKEN }),
  ["blob-head"],
  { revalidate: false }
);

// Хранилището е частно, затова обслужваме снимките през този маршрут:
// взимаме адреса от Blob сървърно (с token) и го препращаме на посетителя,
// вместо той да вика директно защитения адрес на Blob.
export async function GET(request, { params }) {
  const { path } = await params;
  const pathname = path.join("/");

  try {
    const info = await getBlobHead(pathname);
    const res = await fetch(info.url, {
      headers: { Authorization: `Bearer ${BLOB_TOKEN}` },
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
