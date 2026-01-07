"use client";
import { useEffect, useState } from "react";
import "./results.css";
import { fetcher } from "@/src/components/agentFetcher";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [breakupData, setBreakupData] = useState([]);
  const [showBreakup, setShowBreakup] = useState(false);
  const [loadingBreakup, setLoadingBreakup] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    const data = await fetcher(`/student/exam/result?page=${page}`);
    if (data.success) {
      setResults(data.data);
      setPagination(data.pagination);
    }
    setLoading(false);
  };

  const fetchBreakup = async (exam_id) => {
    setLoadingBreakup(true);
    const data = await fetcher(`/student/exam/breakup/${exam_id}`);
    if (data.success) {
      setBreakupData(data.data);
      setShowBreakup(true);
    }
    setLoadingBreakup(false);
  };

  useEffect(() => {
    fetchResults();
  }, [page]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Results</h2>
      </div>

      {loading ? (
        <p className="center">Loading results...</p>
      ) : results.length === 0 ? (
        <p className="center">No exams attempted yet.</p>
      ) : (
        <>
          <div className="dashboard-content">
            {results.map((item) => (
              <div className="result-card" key={item.exam_id}>
                {/* ===== HEADER ===== */}
                <div className="exam-header">
                  <h3 className="exam-title">
                    {item.exam_schedule.exam_name}
                  </h3>

                  <div className="exam-meta">
                    <span className="pill class">
                      🎓 Class {item.exam_schedule.class}
                    </span>
                    <span className="pill subject">
                      📘 {item.exam_schedule.subject}
                    </span>
                  </div>
                </div>

                {/* ===== STATS ===== */}
                <div className="result-stats enhanced">
                  <div className="stat-box score">
                    <span>✅ Score</span>
                    <strong>{(Number(item.score) - Number(item.fatal)) > 0 ? Number(item.score) - Number(item.fatal) : 0}</strong>
                  </div>

                  <div className="stat-box total">
                    <span>📝 Total</span>
                    <strong>{item.total_q}</strong>
                  </div>

                  <div className="stat-box fatal">
                    {/* <span>⚠️ Fatal</span> */}
                    <span>⚠️ Fatal</span>
                    <strong>{item.fatal ?? 0}</strong>
                    {/* <small>Negative Impact</small> */}
                  </div>
                </div>

                {/* ===== ACTION ===== */}
                <button
                  className="secondary-btn"
                  onClick={() => fetchBreakup(item.exam_id)}
                >
                  View Breakup
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="pagination">
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

      {/* ===== BREAKUP POPUP ===== */}
      {showBreakup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h3>Exam Breakup</h3>
              <button onClick={() => setShowBreakup(false)}>✕</button>
            </div>

            <div className="popup-content">
              {loadingBreakup ? (
                <p>Loading...</p>
              ) : (
                breakupData.map((b, i) => (
                  <div
                    key={b.id || i}
                    className={`breakup-q ${b.question[b.selected] === b.question[b.question.ans_option]
                        ? "right"
                        : "wrong"
                      }`}
                  >
                    <p>
                      <strong>Q{i + 1}.</strong> {b.question.question}
                    </p>
                    <p>
                      <b>Your Answer:</b>{" "}
                      {b.selected ? b.question[b.selected] : "Not Attempted"}
                    </p>
                    {b.selected_option !== b.question.ans_option && (
                      <p>
                        <b>Correct:</b>{" "}
                        {b.question[b.question.ans_option]}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
