import { fetcher } from "@/src/components/fetcher";

export async function GET() {
    const baseUrl = "https://allgovjobs.com";
  
    // 🔥 Fetch dynamic jobs
    const sections = await fetcher(`/section?page=1&limit=100&type=sitemap`, {
      next: { revalidate: 60 },
    });
  
    const xmlUrls = sections?.data?.map((section) => {
        return `
        <url>
          <loc>${baseUrl}/${section.url}</loc>
          <lastmod>${
            section.updatedAt || section.createdAt
              ? new Date(section.updatedAt || section.createdAt).toISOString()
              : new Date().toISOString()
          }</lastmod>
        </url>`;
      })
      .join("");
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlUrls}
    </urlset>`;
  
    return new Response(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  }
  