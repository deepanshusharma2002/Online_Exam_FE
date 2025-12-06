export async function GET() {
    const baseUrl = "https://allgovjobs.com";
  
    const urls = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/latest-jobs`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/results`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/admit-card`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/search`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
      },
    ];
  
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `
    <url>
      <loc>${u.url}</loc>
      <lastmod>${u.lastModified.toISOString()}</lastmod>
    </url>`
    )
    .join("")}
  </urlset>`;
  
    return new Response(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  }
  