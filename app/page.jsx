import AdsCard from "@/src/components/AdsCard";
import JobsChip from "@/src/components/JobsChip";
import { jobChipList } from "@/src/utils/constants";
import JobTypeCard from "@/src/components/JobTypeCard";
import NewJobCard from "@/src/components/NewJobCard";
import JobsAdmitResultSection from "@/src/components/Jobs/JobsAdmitResultSection";
import RecentJobCard from "@/src/components/RecentJobCard";
import { fetcher } from "@/src/components/fetcher";

// ✅ Dynamic metadata function
export async function generateMetadata() {
  try {
    const json = await fetcher("/home/text", { next: { revalidate: 120 } });
    const data = json?.success && json?.data?.length > 0 ? json.data[0] : null;

    const seo_title =
      data?.seo_title ||
      "Sarkari Result 2025 – Latest Govt Jobs, Admit Cards & Results";
    const seo_description =
      data?.seo_description ||
      "Sarkari Result 2025 provides all the latest government job notifications, admit cards, results, and exam updates in India.";
    const seo_keywords =
      data?.seo_keywords ||
      "sarkari result, government jobs, sarkari exam, admit card, result 2025, naukari, rojgar, sarkari naukri";

    return {
      title: seo_title,
      description: seo_description,
      keywords: seo_keywords,
      alternates: {
        canonical: "https://allgovjobs.com/",
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
      openGraph: {
        title: seo_title,
        description: seo_description,
        url: "https://allgovjobs.com/",
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
    console.error("Error fetching SEO data:", error);
    return {
      title: "Sarkari Result 2025 – Govt Jobs, Admit Cards & Results",
      description:
        "Get all the latest government job updates, admit cards, and results in one place.",
    };
  }
}

export default async function Home() {
  const homeData = await fetcher("/home/text", { next: { revalidate: 120 } });
  const data = homeData?.success && homeData?.data?.length > 0 ? homeData.data[0] : null;
  const homeLinks = (await fetcher("/home/links?page=1&limit=3&type=home", { next: { revalidate: 120 } }))?.data || [];

  const heading1 = data?.heading1 || "Welcome to No. 1";
  const heading2 = data?.heading2 || "Education Portal Sarkari Result 2025";

  return (
    <div className="container">
      <div className="main_heagin_wrapp">
        <h2>
          <span>{heading1}</span> <br />
        </h2>
        <h1>{heading2}</h1>
      </div>
      <h1></h1>

      <div className="chipMainWrapp">
        {homeLinks?.map((item, index) => (
          <JobsChip key={index} title={item.display_name} url={item.url} />
        ))}
      </div>

      <AdsCard />
      <JobTypeCard /> 
      <JobsAdmitResultSection />
      <RecentJobCard />
      <NewJobCard />


      <script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebPage", "SearchResultsPage"],
            "@id": "https://allgovjobs.com/",
            url: "https://allgovjobs.com/",
            name: "AllGovJobs.com : Sarkari Result 2025, Govt Jobs, Admit Cards",
            thumbnailUrl: "https://allgovjobs.com/img/og-image.jpg",
            datePublished: "2024-10-29T14:10:27+00:00",
            dateModified: new Date().toISOString(),
            description:
              "AllGovJobs.com provides Sarkari Result 2025, sarkari naukri updates, govt job notifications, admit cards, and exam results.",
            inLanguage: "en-IN",

            // ⭐ Website Information
            isPartOf: {
              "@type": "WebSite",
              "@id": "https://allgovjobs.com/#website",
              url: "https://allgovjobs.com/",
              name: "AllGovJobs",
              description: "Sarkari Result 2025, Latest Govt Jobs",
              alternateName: "Sarkari Result",
              inLanguage: "en-IN",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://allgovjobs.com/search?q={search_term_string}",
                },
                "query-input": {
                  "@type": "PropertyValueSpecification",
                  valueRequired: "http://schema.org/True",
                  valueName: "search_term_string",
                },
              },
            },

            // ⭐ Primary Image
            primaryImageOfPage: {
              "@type": "ImageObject",
              "@id": "https://allgovjobs.com/#primaryimage",
              inLanguage: "en-IN",
              url: "https://allgovjobs.com/img/og-image.jpg",
              contentUrl: "https://allgovjobs.com/img/og-image.jpg",
              width: 1200,
              height: 630,
            },

            image: {
              "@type": "ImageObject",
              "@id": "https://allgovjobs.com/#primaryimage",
              inLanguage: "en-IN",
              url: "https://allgovjobs.com/img/og-image.jpg",
              contentUrl: "https://allgovjobs.com/img/og-image.jpg",
              width: 1200,
              height: 630,
            },

            // ⭐ Breadcrumb
            breadcrumb: {
              "@type": "BreadcrumbList",
              "@id": "https://allgovjobs.com/#breadcrumb",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  potentialAction: {
                    "@type": "ReadAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://allgovjobs.com/",
                    },
                  },
                },
              ],
            },
          }),
        }}
      />
      <script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://allgovjobs.com/#/schema/person/allgovjobs",
            name: "AllGovJobs.com",
            sameAs: ["https://allgovjobs.com/"],
            url: "https://allgovjobs.com/author/allgovjobs/",
            image: {
              "@type": "ImageObject",
              "@id": "https://allgovjobs.com/#/schema/person/image",
              inLanguage: "en-IN",
              url: "https://allgovjobs.com/img/profile.jpg",     // 🔁 change to your real avatar
              contentUrl: "https://allgovjobs.com/img/profile.jpg",
              caption: "AllGovJobs.com",
            },
          }),
        }}
      />
      <script
        id="WPHeader"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WPHeader",
            headline: "AllGovJobs",
            description: "AllGovJobs.com"
          })
        }}
      />
      <script
        id="creativework-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "@id": "https://allgovjobs.com/#creativework",
            text: `
AllGovJobs.com – Get Latest Sarkari Result 2025, Government Job Updates, Admit Cards, Answer Keys, Syllabus, Cutoff, Career News, Sarkari Yojana, Scholarship, and Notification updates.

Latest Results:
• IOCL Junior Engineer Result 2025
• IBPS Clerk Pre Result 2025
• Rajasthan Police Constable Result 2025
• RBI Officer Grade B Result 2025
• UPSSSC Enforcement Constable Result 2025
• UTET Result 2025
• Bihar Civil Court Clerk Score Card 2025
• RPSC RAS Marks 2025
• Airforce Agniveer Vayu Result 2025
• SIDBI Grade A & B Result 2025
…and many more.

Admit Cards:
• SBI Clerk Mains Admit Card 2025
• Bihar Jeevika Admit Card 2025
• SBI PO Phase-III Admit Card 2025
• SSC CHSL Tier-I Admit Card 2025
• RRVUNL Technician Admit Card 2025
• UPSSSC Stenographer Admit Card 2025
• UKSSSC ADO, Inspector Admit Card 2025
• UPSC Civil Services Mains Admit Card 2025
…and more.

Latest Jobs:
• AIIMS CRE Group B & C Online Form 2025
• KVS/NVS Teaching & Non-Teaching Online Form 2025
• Railway Apprentice Online Form 2025
• UP Home Guard Online Form 2025 (45000 Posts)
• RRB NTPC Inter Level Online Form 2025
• RRB Junior Engineer Online Form 2025
• IB ACIO Tech Online Form 2025
• RSSB REET Mains Online Form 2025
• BSSC Inter Level Online Form 2025
• PNB Bank LBO Online Form 2025
…and more.

Answer Keys:
• BSEB Sakshamta Pariksha Answer Key 2025
• RSSB Conductor / VDO Answer Key 2025
• UPSSSC Forest Guard Answer Key 2025
• ISRO Scientist Answer Key 2025
• BPSC ASO Answer Key 2025
• SSC CGL Tier-I Answer Key 2025
…and others.

Documents / Notices:
• UP Scholarship Online Form 2025-26
• Haryana Lado Lakshmi Yojana Form 2025
• SSC OTR Correction Notice 2025
• Rajasthan Scholarship 2025
• UP Police Recruitment Calendar 2025-26
• PAN Card Services 2025
• Aadhaar Card Download/Status 2025
• Voter ID Registration & Services 2025
…and more.

Admissions:
• JEE Main January 2026 Online Form
• CSIR NET December 2025 Correction Form
• CTET February 2026 Online Form
• GATE 2026 Online Form – Extended
• Bihar ITI CAT Counselling 2025
• CLAT 2026 Online Form
…and more.

AllGovJobs.com provides trusted updates on Sarkari Result 2025, Government Exams, Admit Cards, Recruitment, and Syllabus in one place.

Top Pages:
• UP Police Result
• Bihar Police Result
• Sarkari Exam
• Sarkari Naukri
• Result 10th/12th
• Sarkari Result 2025 Updates

Disclaimer:
AllGovJobs.com is not associated with any Government Department. Information is for general use only. Verify notifications from official sources before applying.
FAQ:
Q: What is AllGovJobs?
A: A portal to find Govt Jobs, Sarkari Results, Admit Cards, and Exam information.

Q: Is the website free?
A: Yes, all services are 100% free.
`
          }),
        }}
      />


    </div>
  );
}
