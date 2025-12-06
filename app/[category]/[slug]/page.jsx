// import { fetcher } from "@/src/components/fetcher";
// import "./SlugDynamicPage.css";
// import Head from "next/head";

// export default async function SlugDynamicPage({ params }) {
//   const { category, slug } = params;
//   const baseUrl = "https://allgovjobs.com";

//   // Fetch job details
//   let job = null;
//   try {
//     const res = await fetcher(`/naukari?section=${category}&slug=${slug}`, {
//       cache: "no-store",
//     });
//     job = res?.data?.length === 1 ? res.data[0] : null;
//   } catch (error) {
//     console.error("Error fetching job:", error);
//   }

//   const seo_title = job?.seo_title || "Latest Government Jobs | Sarkari Naukri 2025";
//   const seo_description =
//     job?.seo_description ||
//     "Explore the latest government jobs, Sarkari exams, and result updates on Job Portal App. Stay informed and apply online.";
//   const seo_keywords =
//     job?.seo_keywords || "government jobs, sarkari result, sarkari exam, naukri, india jobs";

//   const pageUrl = `${baseUrl}/${category}/${slug}`;
//   const pageImage = job?.image || `${baseUrl}/default-job-image.jpg`;
//   const publishedDate = job?.postDate || new Date().toISOString();

//   console.log("Job Data:", job);

//   if (!job) {
//     return (
//       <div className="view-naukari-error">
//         <h3>No Data Found</h3>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         {/* Primary SEO */}
//         <title>{seo_title}</title>
//         <meta name="description" content={seo_description} />
//         <meta name="keywords" content={seo_keywords} />
//         <meta name="robots" content="index, follow" />

//         {/* Canonical URL */}
//         <link rel="canonical" href={pageUrl} />

//         {/* Open Graph / Facebook */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={seo_title} />
//         <meta property="og:description" content={seo_description} />
//         <meta property="og:image" content={pageImage} />
//         <meta property="og:url" content={pageUrl} />
//         <meta property="og:site_name" content="Job Portal App" />

//         {/* Twitter SEO */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={seo_title} />
//         <meta name="twitter:description" content={seo_description} />
//         <meta name="twitter:image" content={pageImage} />

//         {/* Viewport */}
//         <meta name="viewport" content="width=device-width, initial-scale=1" />

//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org/",
//               "@type": "JobPosting",
//               title: job?.title || "Government Job Vacancy 2025",
//               description: job?.description?.replace(/<[^>]*>/g, "") || seo_description,
//               datePosted: publishedDate,
//               employmentType: "FULL_TIME",
//               hiringOrganization: {
//                 "@type": "Organization",
//                 name: "Job Portal App",
//                 sameAs: baseUrl,
//               },
//               jobLocation: {
//                 "@type": "Place",
//                 address: {
//                   "@type": "PostalAddress",
//                   addressCountry: "IN",
//                 },
//               },
//               validThrough: job?.lastDate || "2025-12-31",
//               url: pageUrl,
//               image: pageImage,
//             }),
//           }}
//         />
//       </Head>

//       <div className="view-naukari-container">
//         <div className="naukari-header">
//           <h1 className="naukari-title">{job.title}</h1>
//           <p className="naukari-date">
//             Published On: {new Date(job.postDate).toLocaleDateString("en-IN")}
//           </p>
//         </div>

//         <div
//           className="naukari-description"
//           dangerouslySetInnerHTML={{ __html: job.description }}
//         ></div>

//         {job.usefulLinks?.length > 0 && (
//           <div className="useful-links-section">
//             <h2 className="useful-links-header">Some Useful Important Links</h2>
//             <table className="useful-links-table">
//               <tbody>
//                 {job.usefulLinks.map((group, i) => (
//                   <tr key={i}>
//                     <td className="link-label">{group.text}</td>
//                     <td className="link-url">
//                       {group.links.map((link, j) => (
//                         <span key={link.id}>
//                           <a
//                             href={link.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {link.display_name}
//                           </a>
//                           {j < group.links.length - 1 && (
//                             <span className="link-separator"> | </span>
//                           )}
//                         </span>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* FAQ Section */}
//         {job.importantQuesAns?.length > 0 && (
//           <div className="faq-section">
//             <h2>Important Questions and Answers</h2>
//             {job.importantQuesAns.map((qa) => (
//               <div className="faq-item" key={qa.id}>
//                 <h4>Q: {qa.question}</h4>
//                 <p>A: {qa.answer}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Discover More */}
//         {job.discoverMoreLinks?.length > 0 && (
//           <div className="discover-section">
//             <h2>Discover More</h2>
//             <div className="discover-grid">
//               {job.discoverMoreLinks.map((link) => (
//                 <a
//                   key={link.id}
//                   href={link.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="discover-card"
//                 >
//                   {link.display_name}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
import { fetcher } from "@/src/components/fetcher";
import "./SlugDynamicPage.css";

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const baseUrl = "https://allgovjobs.com";

  try {
    const res = await fetcher(`/naukari?section=${category}&slug=${slug}`, {
      cache: "no-store",
    });
    const job = res?.data?.length === 1 ? res.data[0] : null;

    const seo_title = job?.seo_title || "Latest Government Jobs | Sarkari Naukri 2025";
    const seo_description =
      job?.seo_description ||
      "Explore the latest government jobs, Sarkari exams, and result updates on Job Portal App. Stay informed and apply online.";
    const seo_keywords =
      job?.seo_keywords ||
      "government jobs, sarkari result, sarkari exam, naukri, india jobs";

    const pageUrl = `${baseUrl}/${category}/${slug}`;
    const pageImage = job?.image || `${baseUrl}/default-job-image.jpg`;

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
        siteName: "Job Portal App",
        images: [
          {
            url: pageImage,
            width: 1200,
            height: 630,
            alt: seo_title,
          },
        ],
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: seo_title,
        description: seo_description,
        images: [pageImage],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Latest Government Jobs | Sarkari Naukri 2025",
      description:
        "Explore the latest government job openings, results, and admit cards for SSC, UPSC, Bank, and other exams.",
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    };
  }
}

export default async function SlugDynamicPage({ params }) {
  const { category, slug } = params;
  const baseUrl = "https://allgovjobs.com";

  let job = null;
  try {
    const res = await fetcher(`/naukari?section=${category}&slug=${slug}`, {
      cache: "no-store",
    });
    job = res?.data?.length === 1 ? res.data[0] : null;
  } catch (error) {
    console.error("Error fetching job:", error);
  }

  if (!job) {
    return (
      <div className="view-naukari-error">
        <h3>No Data Found</h3>
      </div>
    );
  }

  const pageUrl = `${baseUrl}/${category}/${slug}`;
  const pageImage = job?.image || `${baseUrl}/default-job-image.jpg`;
  const publishedDate = job?.postDate || new Date().toISOString();

  return (
    <div className="view-naukari-container">
      {/* ✅ Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job?.title || "Government Job Vacancy 2025",
            description:
              job?.description?.replace(/<[^>]*>/g, "") ||
              "Latest Government Job Vacancy 2025 updates.",
            datePosted: publishedDate,
            employmentType: "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: "Job Portal App",
              sameAs: baseUrl,
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
            validThrough: job?.lastDate || "2025-12-31",
            url: pageUrl,
            image: pageImage,
          }),
        }}
      />

      <div className="naukari-header">
        <h1 className="naukari-title">{job.title}</h1>
        <p className="naukari-date">
          Published On: {new Date(job.postDate).toLocaleDateString("en-IN")}
        </p>
      </div>

      <div
        className="naukari-description"
        dangerouslySetInnerHTML={{ __html: job.description }}
      ></div>

      {job.usefulLinks?.length > 0 && (
        <div className="useful-links-section">
          <h2 className="useful-links-header">Some Useful Important Links</h2>
          <table className="useful-links-table">
            <tbody>
              {job.usefulLinks.map((group, i) => (
                <tr className="link-table" key={i}>
                  <td className="link-label">{group.text}</td>
                  <td className="link-url">
                    {group.links.map((link, j) => (
                      <span key={link.id}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.display_name}
                        </a>
                        {j < group.links.length - 1 && (
                          <span className="link-separator"> | </span>
                        )}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {job.importantQuesAns?.length > 0 && (
        <div className="faq-section">
          <h2>Important Questions and Answers</h2>
          {job.importantQuesAns.map((qa) => (
            <div className="faq-item" key={qa.id}>
              <h4>Q: {qa.question}</h4>
              <p>A: {qa.answer}</p>
            </div>
          ))}
        </div>
      )}

      {job.discoverMoreLinks?.length > 0 && (
        <div className="discover-section">
          <h2>Discover More</h2>
          <div className="discover-grid">
            {job.discoverMoreLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="discover-card"
              >
                {link.display_name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
