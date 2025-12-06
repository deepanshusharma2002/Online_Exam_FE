export default function robots() {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/admin", "/api"],
        },
      ],
      sitemap: [
        "https://allgovjobs.com/sitemap.xml",
        "https://allgovjobs.com/sitemap-section.xml",
        "https://allgovjobs.com/sitemap-jobs.xml",
      ],
      host: "https://allgovjobs.com",
    };
  }
  