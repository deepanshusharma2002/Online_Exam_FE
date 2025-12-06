"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetcher } from "@/src/components/fetcher";
import "./JobSearch.scss";

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetcher(`/naukari?search=${encodeURIComponent(searchTerm)}&limit=20`);
      setJobs(res?.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="job-search-container">
      <h1 className="heading">Search Government Jobs</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by title, keyword, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading && <p className="loading">Loading jobs...</p>}

      {!loading && jobs.length > 0 && (
        <section className="jobs-list">
          {jobs.map((job) => (
            <article key={job.naukari_id} className="job-item">
              <Link href={`/${job.seo_section}/${job.slug}`} className="job-title">
                {job.title}
              </Link>
            </article>
          ))}
        </section>
      )}

      {!loading && !error && jobs.length === 0 && (
        <p className="no-jobs">No jobs found. Try searching with different keywords.</p>
      )}
    </main>
  );
}
