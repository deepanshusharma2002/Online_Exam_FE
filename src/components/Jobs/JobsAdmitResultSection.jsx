import React from "react";
import "./JobsAdmitResultSection.css";
import { fetcher } from "../fetcher";
import Loader from "../Loader/Loader";

async function getNaukariData() {
  try {
    const [jobsRes, admitRes, resultRes] = await Promise.all([
      fetcher(`/naukari?page=1&limit=10&type=latest-jobs`, { next: { revalidate: 60 } }),
      fetcher(`/naukari?page=1&limit=10&type=admit_card`, { next: { revalidate: 60 } }),
      fetcher(`/naukari?page=1&limit=10&type=result`, { next: { revalidate: 60 } }),
    ]);

    return {
      jobs: jobsRes?.data || [],
      admitCards: admitRes?.data || [],
      results: resultRes?.data || [],
    };
  } catch (error) {
    console.error("Error fetching naukari data:", error);
    return { jobs: [], admitCards: [], results: [] };
  }
}

export default async function JobsAdmitResultSection() {
  const { jobs, admitCards, results } = await getNaukariData();

  if (!jobs && !admitCards && !results) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "30vh",
        }}
      >
        <Loader size={50} />
      </div>
    );
  }

  const Card = ({ title, url, data, color }) => (
    <div className="card">
      <div className={`card-header ${color}`}>{title}</div>

      <div className="card-body">
        {data.length > 0 ? (
          data.map((item) => (
            <a
              key={item.naukari_id}
              href={`/${item.seo_section}/${item.slug}`}
              className="card-link"
            >
              {item.title}
            </a>
          ))
        ) : (
          <p className="no-data">No {title} found.</p>
        )}
      </div>

      {data.length === 10 && (
        <div className="card-footer">
          <a
            href={`/${url}`}
            className={`view-btn ${color}`}
          >
            View All →
          </a>
        </div>
      )}
    </div>
  );

  return (
    <div className="section-container">
      <Card title="Jobs" url="latest-jobs" data={jobs} color="red" />
      <Card title="Admit Card" url="admit-card" data={admitCards} color="pink" />
      <Card title="Results" url="results" data={results} color="red" />
    </div>
  );
}
