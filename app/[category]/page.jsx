import { fetcher } from "@/src/components/fetcher";
import "../latest-jobs/latest-job.scss";
import "../latest-jobs/ViewJobs.css";
import Loader from "@/src/components/Loader/Loader";
import Link from "next/link";
import { redirect } from "next/navigation";

// ✅ Pagination limit
const limit = 10;

// ✅ Dynamic Metadata (for SEO)
export async function generateMetadata({ params }) {
  const { category } = params;

  try {
    // Fetch SEO Data for category
    const json = await fetcher(`/section?section=${category}`, {
      next: { revalidate: 60 },
    });

    const seoData = json?.data?.[0] || {};

    const seo_title =
      seoData?.seo_title ||
      `${category?.toUpperCase()} – Latest Government Jobs 2025`;
    const seo_description =
      seoData?.seo_description ||
      `Explore all latest ${category} job updates, government vacancies, admit cards, and results. Stay informed with accurate and timely Sarkari updates from India.`;
    const seo_keywords =
      seoData?.seo_keywords ||
      `${category}, government jobs, sarkari result, sarkari naukri, admit card, result 2025`;

    const pageUrl = `https://allgovjobs.com/${category}`;

    return {
      title: seo_title,
      description: seo_description,
      keywords: seo_keywords,
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
      openGraph: {
        title: seo_title,
        description: seo_description,
        url: pageUrl,
        siteName: "Sarkari Result 2025",
        images: [
          {
            url: "https://allgovjobs.com/img/og-image.jpg",
            width: 1200,
            height: 630,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo_title,
        description: seo_description,
        images: ["https://allgovjobs.com/img/og-image.jpg"],
      },
    };
  } catch (error) {
    console.error("Error fetching category SEO:", error);
    return {
      title: `${category?.toUpperCase()} – Latest Government Jobs 2025`,
      description: `Find all latest ${category} government job notifications, admit cards, and results.`,
    };
  }
}

// ✅ Category Dynamic Page Component
export default async function CategoryDynamicPage({ params, searchParams }) {
  const { category } = params;
  const page = Number(searchParams.page) || 1;

  // Fetch category jobs
  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&section=${category?.toLowerCase()}`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const jobs = res?.data || [];
  if (!jobs.length) {
    redirect("/latest-jobs");
  }
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  // ✅ Schema.org Structured Data (Breadcrumb + JobPosting)
  const schemaData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://allgovjobs.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category,
          item: `https://allgovjobs.com/${category}`,
        },
      ],
    },
    ...jobs.slice(0, 5).map((job) => ({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: job.title,
      description: job.title,
      datePosted: job.createdAt || "2025-01-01",
      validThrough: "2025-12-31",
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Government of India",
        sameAs: "https://www.india.gov.in/",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "India",
          addressRegion: "India",
          addressCountry: "IN",
        },
      },
      identifier: {
        "@type": "PropertyValue",
        name: "Job Portal App",
        value: job.naukari_id,
      },
      url: `https://allgovjobs.com/${job.seo_section}/${job.slug}`,
    })),
  ];

  return (
    <div className="admin-card-container">
      {/* ✅ Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <h1 className="heading">
        {category?.replace("_", " ")?.toUpperCase()} – Latest Government Jobs
      </h1>

      <p className="text">
        Welcome to <strong>Sarkari Result</strong> – your trusted portal for all
        updates related to {category?.replace("_", " ")?.toUpperCase()} jobs, admit cards, and results. Check the
        latest openings, download admit cards, and view results in one place.{" "}
        <a href="#">Stay Updated.</a>
      </p>

      <p className="text">
        <strong>Sarkari Result</strong> में आपका स्वागत है। यहां पर आप{" "}
        <strong>{category?.replace("_", " ")?.toUpperCase()}</strong> की नवीनतम सरकारी नौकरियों, प्रवेश पत्रों और
        परिणामों की जानकारी प्राप्त कर सकते हैं।
      </p>

      <h2>
        Latest <span className="highlight">{category?.replace("_", " ")?.toUpperCase()}</span> Jobs
      </h2>

      <div className="jobs-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Link
              key={job.naukari_id}
              href={`/${job.seo_section}/${job.slug}`}
              className="job-title"
            >
              {job.title}
            </Link>
          ))
        ) : (
          <p className="no-jobs">No jobs available.</p>
        )}
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <Link href={`/${category}?page=${page - 1}`}>
              <button>Prev</button>
            </Link>
          )}
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link href={`/${category}?page=${page + 1}`}>
              <button>Next</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
