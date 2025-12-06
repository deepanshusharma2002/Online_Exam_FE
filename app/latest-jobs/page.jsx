import { fetcher } from "@/src/components/fetcher";
import './ViewJobs.css';
import './latest-job.scss';
import Link from "next/link";

const limit = 20;

export const metadata = {
  title: "Sarkari Result 2025 | Latest Government Jobs & Vacancies Today",
  description:
    "Check all Latest Sarkari Result 2025 Government Jobs, SSC, UPSC, Railway, Police, Defence, Bank, and State Jobs. Get the latest govt job notifications updated daily.",
  keywords:
    "Sarkari Result, Sarkari Naukri, Latest Government Jobs 2025, Govt Jobs 2025, Sarkari Exam, Sarkari Vacancy, Police Jobs, Railway Jobs, Bank Jobs, SSC, UPSC",
  openGraph: {
    title: "Sarkari Result 2025 - Latest Government Jobs & Sarkari Naukri Updates",
    description:
      "Get Sarkari Result 2025 latest government job updates — SSC, UPSC, Bank, Railway, and State Vacancies. Find Sarkari Naukri notifications updated daily.",
    url: "https://allgovjobs.com/latest-jobs",
    type: "website",
  },
  alternates: {
    canonical: "https://allgovjobs.com/latest-jobs",
  },
  // ✅ Added Robots tag for SEO
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
};


export default async function ViewJobs({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=latest-jobs`, {
      next: { revalidate: 120 },
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res || jobs.length === 0) {
    return (
      <main className="admin-card-container">
        <h1 className="heading">Latest Sarkari Jobs 2025</h1>
        <p className="no-jobs">No jobs available at the moment.</p>
      </main>
    );
  }

  return (
    <main className="admin-card-container">
      <h1 className="heading">Sarkari Result 2025 – Latest Government Jobs & Vacancies</h1>

      <section className="intro">
        <p className="text">
          Welcome to <strong>Sarkari Result</strong> – your trusted source for all
          <strong> latest government job updates</strong> in India. Explore opportunities from
          <strong> SSC, UPSC, Railway, Bank, Defence, Police, and State Government</strong> sectors.
          We update this page daily to keep you informed about new openings, eligibility, and last dates.
        </p>

        <p className="text">
          <strong>Sarkari Result</strong> में आपका स्वागत है। यहां आपको भारत भर की सभी
          <strong> सरकारी नौकरियों </strong>की जानकारी मिलेगी — SSC, UPSC, बैंक, रेलवे, पुलिस
          और राज्य सरकार की नौकरियों से जुड़ी सभी वैकेंसी की नवीनतम जानकारी यहां रोज़ अपडेट की जाती है।
        </p>
      </section>

      <h2>All Latest <span className="highlight">Government Jobs 2025</span></h2>

      <section className="jobs-list" itemScope itemType="https://schema.org/ItemList">
        {jobs.map((job, index) => (
          <article
            key={job.naukari_id}
            className="job-item"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <meta itemProp="position" content={String(index + 1)} />
            <Link
              href={`/${job.seo_section}/${job.slug}`}
              itemProp="url"
              className="job-title"
            >
              <span itemProp="name">{job.title}</span>
            </Link>
          </article>
        ))}
      </section>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          {page > 1 && (
            <Link href={`?page=${page - 1}`} prefetch>
              <button>Previous</button>
            </Link>
          )}
          <span className="page-info">Page {page} of {totalPages}</span>
          {page < totalPages && (
            <Link href={`?page=${page + 1}`} prefetch>
              <button>Next</button>
            </Link>
          )}
        </nav>
      )}

      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sarkari Result 2025 - Latest Government Jobs",
            description:
              "Explore all Sarkari Result 2025 latest government jobs including SSC, UPSC, Police, Bank, Railway, and Defence job updates.",
            itemListElement: jobs.map((job, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: job.title,
              url: `https://allgovjobs.com/${job.seo_section}/${job.slug}`,
            })),
          }),
        }}
      /> */}

    </main>
  );
}
