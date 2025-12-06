export async function GET() {
    const baseUrl = "https://allgovjobs.com";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${baseUrl}/sitemap.xml</loc>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-section.xml</loc>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemap-jobs.xml</loc>
    </sitemap>
  </sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
