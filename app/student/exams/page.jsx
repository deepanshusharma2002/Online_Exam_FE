"use client";
import { useEffect, useState } from "react";
import "./examPages.css";
import { fetcher } from "@/src/components/agentFetcher";

const TABS = [
  // { key: "all", label: "All Exams" },
  { key: "ongoing", label: "Ongoing Exams" },
  { key: "upcoming", label: "Upcoming Exams" },
];

const ExamPages = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [exams, setExams] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchExams = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const data = await fetcher(`/student/exams?tab=${activeTab}&page=${page}&limit=${limit}`,);

      if (!data.success) throw new Error(data.message);

      setExams(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load exams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, [activeTab, page]);

  // Reset page when tab changes
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  return (
    <div className="exam-page">
      <h1 className="exam-title">My Exams</h1>

      {/* Tabs */}
      <div className="exam-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="exam-loader">Loading exams...</div>
      ) : error ? (
        <div className="exam-error">{error}</div>
      ) : exams.length === 0 ? (
        <div className="exam-empty">No exams found</div>
      ) : (
        <>
          <div className="exam-list">
            {exams.map((exam) => (
              <div key={exam.exam_schedule_id} className="exam-card">
                <div className="exam-card-header">
                  <h3>{exam.exam_name}</h3>
                  <span className="exam-class">
                    Class {exam.class} · {exam.subject}
                  </span>
                </div>

                <div className="exam-info">
                  <div>
                    <strong>Start:</strong>{" "}
                    {new Date(exam.start_date).toLocaleDateString("en-IN")}{" "}
                    {exam.start_time}
                  </div>
                  <div>
                    <strong>End:</strong>{" "}
                    {new Date(exam.end_date).toLocaleDateString("en-IN")}{" "}
                    {exam.end_time}
                  </div>
                  <div>
                    <strong>Questions:</strong> {exam.total_q}
                  </div>
                  <div>
                    <strong>Duration:</strong> {exam.exam_time_min} min
                  </div>
                </div>

                {activeTab === "ongoing" && (
                  <button className="start-exam-btn">Start Exam</button>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="exam-pagination">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExamPages;
