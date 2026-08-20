import { head } from "@vercel/blob";

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

// Хранилището е частно, затова обслужваме снимките през този маршрут:
// взимаме адреса от Blob сървърно (с token) и го препращаме на посетителя,
// вместо той да вика директно защитения адрес на Blob.
export async function GET(request, { params }) {
  const { path } = await params;
  const pathname = path.join("/");

  try {
    const info = await head(pathname, { token: BLOB_TOKEN });
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
