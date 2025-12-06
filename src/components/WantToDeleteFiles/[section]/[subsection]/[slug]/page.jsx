"use client";

import { fetcher } from "@/src/components/fetcher";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/src/components/Loader/Loader";
import "./SlugDynamicPage.css";

const SlugDynamicPage = () => {
  const params = useParams();
  const { category, section, subsection, slug } = params;
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetcher(
        `/naukari?category=${category}&section=${section}&sub_section=${subsection}&slug=${slug}`
      );
      setJobs(res?.data?.length === 1 ? res.data[0] : null);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading)
    return (
      <div className="view-naukari-loader">
        <Loader size={50} />
      </div>
    );

  if (!jobs)
    return (
      <div className="view-naukari-error">
        <h3>No Data Found</h3>
      </div>
    );

  return (
    <div className="view-naukari-container">
      {/* Header */}
      <div className="naukari-header">
        <h1 className="naukari-title">{jobs.title}</h1>
        <p className="naukari-date">
          Published On: {new Date(jobs.postDate).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Description */}
      <div
        className="naukari-description"
        dangerouslySetInnerHTML={{ __html: jobs.description }}
      ></div>

      {/* ✅ Useful Links Section */}
      {jobs.usefulLinks?.length > 0 && (
        <div className="useful-links-section">
          <h2 className="useful-links-header">Some Useful Important Links</h2>
          <table className="useful-links-table">
            <tbody>
              {jobs.usefulLinks.map((group, i) => (
                <tr key={i}>
                  <td className="link-label">{group.text}</td>
                  <td className="link-url">
                    {group.links.map((link, j) => (
                      <React.Fragment key={link.id}>
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
                      </React.Fragment>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* FAQ Section */}
      {jobs.importantQuesAns?.length > 0 && (
        <div className="faq-section">
          <h2>Important Questions and Answers</h2>
          {jobs.importantQuesAns.map((qa) => (
            <div className="faq-item" key={qa.id}>
              <h4>Q: {qa.question}</h4>
              <p>A: {qa.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Discover More Section */}
      {jobs.discoverMoreLinks?.length > 0 && (
        <div className="discover-section">
          <h2>Discover More</h2>
          <div className="discover-grid">
            {jobs.discoverMoreLinks.map((link) => (
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
};

export default SlugDynamicPage;
