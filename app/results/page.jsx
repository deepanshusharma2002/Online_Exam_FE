import { fetcher } from '@/src/components/fetcher';
import './results.scss';
import '../latest-jobs/ViewJobs.css';
import Link from 'next/link';

const limit = 20;

export const metadata = {
  title: 'Sarkari Result 2025 | Latest Government Exam Results Today',
  description:
    'Check all latest Sarkari Results 2025 from UPSC, SSC, Railway, Police, Bank, and other government exams. Get official government result updates instantly.',
  keywords:
    'Sarkari Result, Sarkari Results 2025, Government Result, Latest Result, Exam Result, Sarkari Exam, Govt Job Results, SSC Result, UPSC Result, Bank Result, Railway Result',
  openGraph: {
    title: 'Sarkari Result 2025 | All Latest Government Exam Results',
    description:
      'Get all Sarkari Result 2025 updates for SSC, UPSC, Bank, Police, and other exams. Stay updated with real-time government result announcements.',
    url: 'https://allgovjobs.com/results',
    siteName: 'Sarkari Result 2025',
    type: 'website',
    images: [
      {
        url: 'https://allgovjobs.com/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sarkari Result 2025 – Latest Government Exam Results',
      },
    ],
  },
  alternates: {
    canonical: 'https://allgovjobs.com/results',
  },
  // ✅ Robots tag for better SEO visibility and image previews
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sarkari Result 2025 | Latest Government Exam Results',
    description:
      'Find all Sarkari Result 2025 updates for SSC, UPSC, Bank, Police, and other government exams. Stay informed with official results instantly.',
    images: ['https://allgovjobs.com/img/og-image.jpg'],
  },
};


export default async function LatestResults({ searchParams }) {
  const page = Number(searchParams?.page) || 1;

  let res = null;
  try {
    res = await fetcher(`/naukari?page=${page}&limit=${limit}&type=result`, {
      next: { revalidate: 120 },
    });
  } catch (error) {
    console.error('Error fetching results:', error);
  }

  const jobs = res?.data || [];
  const totalPages = res?.pagination?.totalPages || 1;

  if (!res || jobs.length === 0) {
    return (
      <main className="admin-card-container">
        <h1 className="heading">Sarkari Result 2025</h1>
        <p className="no-jobs">No results declared yet. Please check back soon.</p>
      </main>
    );
  }

  return (
    <main className="admin-card-container">
      <h1 className="heading">Sarkari Result 2025 – Latest Government Exam Results</h1>

      <section className="intro">
        <p className="text">
          Welcome to <strong>Sarkari Result</strong> – your one-stop destination for all
          <strong> government exam results</strong> including UPSC, SSC, Bank, Railway,
          Police, and State Government exams. Stay updated with official result
          announcements, merit lists, and scorecards.
        </p>

        <p className="text">
          <strong>Sarkari Result</strong> में आपका स्वागत है। यहां आपको सभी सरकारी परीक्षाओं
          जैसे <strong>UPSC, SSC, बैंक, रेलवे</strong> और अन्य की नवीनतम
          <strong> रिजल्ट जानकारी</strong> प्राप्त होगी।
        </p>
      </section>

      <h2>All Latest <span className="highlight">Examination Results 2025</span></h2>

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

      {/* ✅ JSON-LD Structured Data for SEO */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Sarkari Result 2025",
            description:
              "Get latest Sarkari Result 2025 updates from SSC, UPSC, Bank, Police, and other exams.",
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
