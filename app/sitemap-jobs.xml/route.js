import { fetcher } from "@/src/components/fetcher";

export async function GET() {
    const baseUrl = "https://allgovjobs.com";
  
    // 🔥 Fetch dynamic jobs
    const jobs = await fetcher(`/naukari?page=1&limit=200&type=sitemap`, {
      next: { revalidate: 60 },
    });
  
    const xmlUrls = jobs?.data?.map((job) => {
        return `
        <url>
          <loc>${baseUrl}/${job.seo_section}/${job.slug}</loc>
          <lastmod>${
            job.updatedAt || job.createdAt
              ? new Date(job.updatedAt || job.createdAt).toISOString()
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
  